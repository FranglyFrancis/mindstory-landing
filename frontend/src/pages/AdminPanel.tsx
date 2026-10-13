import { useEffect,useState } from "react";
import { API_URL } from "../config";



/* ---------- field definitions (match your Mongoose schema) ---------- */
type FieldSpec = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "group" | "list" | "strings";
  options?: string[];
  fields?: FieldSpec[];
};

const t = (key: string, label = key): FieldSpec => ({ key, label });
const ta = (key: string, label = key): FieldSpec => ({ key, label, type: "textarea" });

const iconItem = [t("icon"), t("title"), ta("description")];
const titleDesc = [t("title"), ta("description")];

const serviceFields: FieldSpec[] = [
  t("slug"),
  t("title"),
  ta("description"),
  t("image", "Card image path"),
  { key: "order", label: "Order", type: "number" },
  t("mainImage", "Main image path"),
  { key: "hero", label: "Hero", type: "group", fields: [t("title"), ta("description"), t("image")] },
  { key: "heading", label: "Heading", type: "group", fields: titleDesc },
  { key: "intro", label: "Intro", type: "group", fields: [t("title"), ta("left"), ta("right")] },
  {
    key: "article", label: "Article", type: "group",
    fields: [t("title"), { key: "descriptions", label: "Paragraphs", type: "strings" }],
  },
  { key: "lists", label: "Lists (icon, title, description)", type: "list", fields: iconItem },
  { key: "iconCards", label: "Icon cards", type: "list", fields: iconItem },
  { key: "titleCards", label: "Title cards", type: "list", fields: titleDesc },
  { key: "titleItem", label: "Title items (title, description, image)", type: "list", fields: [t("title"), ta("description"), t("image")] },
  { key: "imageItem", label: "Image item", type: "group", fields: [t("image"), ta("description")] },
  { key: "paraItem", label: "Paragraph items", type: "list", fields: [ta("description")] },
  {
    key: "features", label: "Features", type: "list",
    fields: [
      t("title"), ta("description"), t("image"),
      { key: "imagePosition", label: "Image position", type: "select", options: ["left", "right"] },
    ],
  },
  {
    key: "sections", label: "Sections", type: "list",
    fields: [
      t("title"), t("image"),
      { key: "content", label: "Content", type: "list", fields: titleDesc },
    ],
  },
  { key: "brands", label: "Brands", type: "list", fields: [t("image"), t("brand")] },
  { key: "faqs", label: "FAQs", type: "list", fields: [t("question"), ta("answer")] },
];

/* ---------- helpers ---------- */
type Doc = Record<string, any>;

function blank(specs: FieldSpec[]): Doc {
  const out: Doc = {};
  for (const s of specs) {
    if (s.type === "list" || s.type === "strings") out[s.key] = [];
    else if (s.type === "group") out[s.key] = blank(s.fields!);
    else if (s.type === "number") out[s.key] = 0;
    else if (s.type === "select") out[s.key] = s.options![0];
    else out[s.key] = "";
  }
  return out;
}

async function api(path: string, token: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}/api/admin${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data;
}

/* ---------- generic form renderer ---------- */
const box: React.CSSProperties = { border: "1px solid #ccc", borderRadius: 6, padding: 10, margin: "8px 0" };
const input: React.CSSProperties = { width: "100%", padding: 6, boxSizing: "border-box" };

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  [copy[from], copy[to]] = [copy[to], copy[from]];
  return copy;
}

function Fields({ specs, value, onChange }: { specs: FieldSpec[]; value: Doc; onChange: (v: Doc) => void }) {
  return (
    <>
      {specs.map((s) => (
        <FieldInput
          key={s.key}
          spec={s}
          value={value?.[s.key]}
          onChange={(v) => onChange({ ...value, [s.key]: v })}
        />
      ))}
    </>
  );
}

function FieldInput({ spec, value, onChange }: { spec: FieldSpec; value: any; onChange: (v: any) => void }) {
  const label = <label style={{ display: "block", fontSize: 13, fontWeight: 600, margin: "6px 0 2px" }}>{spec.label}</label>;

  if (spec.type === "textarea")
    return <div>{label}<textarea rows={3} style={input} value={value ?? ""} onChange={(e) => onChange(e.target.value)} /></div>;

  if (spec.type === "number")
    return <div>{label}<input type="number" style={input} value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} /></div>;

  if (spec.type === "select")
    return (
      <div>{label}
        <select style={input} value={value ?? spec.options![0]} onChange={(e) => onChange(e.target.value)}>
          {spec.options!.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
    );

  if (spec.type === "group")
    return (
      <details style={box}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>{spec.label}</summary>
        <Fields specs={spec.fields!} value={value ?? {}} onChange={onChange} />
      </details>
    );

  if (spec.type === "strings") {
    const items: string[] = value ?? [];
    return (
      <div>{label}
        {items.map((v, i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <textarea rows={3} style={input} value={v} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
            <button onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
        <button onClick={() => onChange([...items, ""])}>+ Add paragraph</button>
      </div>
    );
  }

  if (spec.type === "list") {
    const items: Doc[] = value ?? [];
    return (
      <details style={box}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>{spec.label} ({items.length})</summary>
        {items.map((item, i) => (
          <div key={i} style={{ ...box, background: "#fafafa" }}>
            <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
              <button onClick={() => onChange(move(items, i, i - 1))}>↑</button>
              <button onClick={() => onChange(move(items, i, i + 1))}>↓</button>
              <button onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
            </div>
            <Fields specs={spec.fields!} value={item} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} />
          </div>
        ))}
        <button onClick={() => onChange([...items, blank(spec.fields!)])}>+ Add item</button>
      </details>
    );
  }

  return <div>{label}<input style={input} value={value ?? ""} onChange={(e) => onChange(e.target.value)} /></div>;
}

/* ---------- page ---------- */
export default function AdminPanel() {
  const [token, setToken] = useState(sessionStorage.getItem("admin-token") ?? "");
  const [password, setPassword] = useState("");
  const [services, setServices] = useState<Doc[]>([]);
  const [doc, setDoc] = useState<Doc | null>(null);
  const [mode, setMode] = useState<"form" | "json">("form");
  const [jsonText, setJsonText] = useState("");
  const [msg, setMsg] = useState("");

  async function load(t = token) {
  try {
    const list = await api("/services", t);
    setServices(list);
    return list as Doc[];
  } catch (e: any) {
    setMsg(e.message);
    logout();
    return [] as Doc[];
  }
}

  async function login() {
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed");
      sessionStorage.setItem("admin-token", data.token);
      setToken(data.token);
      setPassword("");
      setMsg("");
    } catch (e: any) {
      setMsg(e.message);
    }
  }

  function logout() {
    sessionStorage.removeItem("admin-token");
    setToken("");
  }

 function select(s: Doc) {
  setDoc(JSON.parse(JSON.stringify(s)));
  if (s._id) sessionStorage.setItem("admin-last-id", s._id);
  setMode("form");
  setMsg("");
}

  function newService() {
    setDoc({ ...blank(serviceFields), slug: "new-service", title: "New Service" });
    setMode("form");
    setMsg("");
  }

  function switchMode(next: "form" | "json") {
    if (!doc) return;
    if (next === "json") setJsonText(JSON.stringify(doc, null, 2));
    else {
      try { setDoc(JSON.parse(jsonText)); } catch { return setMsg("Invalid JSON, fix it first"); }
    }
    setMode(next);
    setMsg("");
  }

  async function save() {
    try {
      const body = mode === "json" ? JSON.parse(jsonText) : { ...doc };
      const id = doc?._id;
      delete body._id;
      delete body.__v;
      const saved = id
        ? await api(`/services/${id}`, token, { method: "PUT", body: JSON.stringify(body) })
        : await api("/services", token, { method: "POST", body: JSON.stringify(body) });
      setDoc(saved);
      setMsg("Saved");
      load();
    } catch (e: any) {
      setMsg(`Error: ${e.message}`);
    }
  }

  async function remove() {
    if (!doc?._id || !confirm("Delete this service?")) return;
    try {
      await api(`/services/${doc._id}`, token, { method: "DELETE" });
      setMsg("Deleted");
      const list = await load();
      if (list.length) select(list[0]);
      else setDoc(null);
    } catch (e: any) {
      setMsg(`Error: ${e.message}`);
    }
  }

  useEffect(() => {
  if (!token) return;
  (async () => {
    const list = await load(token);
    if (!list.length) return;
    const lastId = sessionStorage.getItem("admin-last-id");
    select(list.find((s) => s._id === lastId) ?? list[0]);
  })();
}, [token]);

  if (!token) {
    return (
      <div style={{ maxWidth: 360, margin: "80px auto" }}>
        <h2>Admin login</h2>
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()} style={input} />
        <button onClick={login} style={{ marginTop: 10 }}>Login</button>
        {msg && <p>{msg}</p>}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 20, padding: 20, alignItems: "flex-start" }}>
      <div style={{ width: 260, position: "sticky", top: 10 }}>
        <button onClick={() => load()}>Load services</button>{" "}
        <button onClick={logout}>Logout</button>
        <button onClick={newService} style={{ display: "block", margin: "10px 0" }}>+ New service</button>
        {services.map((s) => (
          <div key={s._id} onClick={() => select(s)}
            style={{ padding: 8, cursor: "pointer", background: s._id === doc?._id ? "#ddd" : "transparent" }}>
            {s.title} <small>({s.slug})</small>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, maxWidth: 800 }}>
        {!doc ? (
          <p>Select a service or create a new one.</p>
        ) : (
          <>
            <div style={{ marginBottom: 10 }}>
              <button onClick={() => switchMode("form")} disabled={mode === "form"}>Form</button>{" "}
              <button onClick={() => switchMode("json")} disabled={mode === "json"}>JSON</button>
            </div>

            {mode === "form" ? (
              <Fields specs={serviceFields} value={doc} onChange={setDoc} />
            ) : (
              <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} spellCheck={false}
                style={{ width: "100%", height: "70vh", fontFamily: "monospace", fontSize: 13 }} />
            )}

            <div style={{ marginTop: 12, position: "sticky", bottom: 0, background: "#fff", padding: "8px 0" }}>
              <button onClick={save}>Save</button>{" "}
              {doc._id && <button onClick={remove}>Delete</button>} <strong>{msg}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}