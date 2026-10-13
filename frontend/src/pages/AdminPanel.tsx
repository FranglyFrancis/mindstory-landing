import { useEffect,useState } from "react";
import { API_URL } from "../config";
import './AdminPanel.css';


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

// fields that are always shown
const coreKeys = ["slug", "title", "description", "image", "order"];
const coreFields = serviceFields.filter((s) => coreKeys.includes(s.key));
const optionalFields = serviceFields.filter((s) => !coreKeys.includes(s.key));

function isEmpty(spec: FieldSpec, v: any): boolean {
  if (v == null) return true;
  switch (spec.type) {
    case "list":
      return !Array.isArray(v) || v.length === 0;
    case "strings":
      return !Array.isArray(v) || v.every((s) => !String(s).trim());
    case "group":
      return spec.fields!.every((f) => isEmpty(f, v[f.key]));
    case "number":
      return false;
    default:
      return String(v).trim() === "";
  }
}

// keys of optional sections that currently have data
const filledKeys = (d: Doc) =>
  optionalFields.filter((s) => !isEmpty(s, d[s.key])).map((s) => s.key);

const toggleable = serviceFields.filter((s) => s.type === "group" || s.type === "list");

function Visibility({ doc, onChange }: { doc: Doc; onChange: (v: Doc) => void }) {
  const hidden: string[] = doc.hiddenSections ?? [];
  const items = toggleable.filter((s) => !isEmpty(s, doc[s.key]));
  if (!items.length) return null;

  const toggle = (key: string) =>
    onChange({
      ...doc,
      hiddenSections: hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key],
    });

  return (
    <details open>
      <summary>Show / hide sections ({hidden.length} hidden)</summary>
      {items.map((s) => (
        <label key={s.key}>
          <input type="checkbox" checked={!hidden.includes(s.key)} onChange={() => toggle(s.key)} />{" "}
          {s.label}
          {hidden.includes(s.key) && <small style={{ color: "#c00" }}> (hidden)</small>}
        </label>
      ))}
    </details>
  );
}

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
const box: React.CSSProperties = {};
const input: React.CSSProperties = {};

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
  const label = <label>{spec.label}</label>;

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
          <div key={i} className="row">
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
          <div key={i} className="card">
            <div className="card-tools">
                <button onClick={() => onChange(move(items, i, i - 1))}>↑</button>
                <button onClick={() => onChange(move(items, i, i + 1))}>↓</button>
                <button className="danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
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
  const [shown, setShown] = useState<string[]>([]); // optional sections open in the form

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
  setShown(filledKeys(s));
  if (s._id) sessionStorage.setItem("admin-last-id", s._id);
  setMode("form");
  setMsg("");
}

function newService() {
  setDoc({ ...blank(serviceFields), slug: "new-service", title: "New Service", hiddenSections: [] });
  setShown([]);
  setMode("form");
  setMsg("");
}

  function switchMode(next: "form" | "json") {
    if (!doc) return;
    if (next === "json") setJsonText(JSON.stringify(doc, null, 2));
    else {
      try {
        const parsed = JSON.parse(jsonText);
        setDoc(parsed);
        setShown(filledKeys(parsed));
        } catch { return setMsg("Invalid JSON, fix it first"); }
    }
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
      setShown(filledKeys(saved));
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
      <div className="admin">
        <div className="admin-login">
            <h2>Admin login</h2>
            <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()} />
            <button className="primary" onClick={login} style={{ marginTop: 12 }}>Login</button>
            {msg && <p className="admin-msg">{msg}</p>}
        </div>
      </div>
    );
  }

  

  return (
    
    <div className="admin admin-layout">
        <aside className="admin-sidebar">
            <div className="admin-actions">
            {/* <button onClick={() => load()}>Reload</button> */}
            <button onClick={logout}>Logout</button>
            </div>
            <button className="primary" onClick={newService} style={{ width: "100%", marginBottom: 10 }}>
            + New service
            </button>
            {services.map((s) => (
            <div key={s._id} onClick={() => select(s)}
                className={`admin-item ${s._id === doc?._id ? "active" : ""}`}>
                {s.title} <small>({s.slug})</small>
            </div>
            ))}
        </aside>

        <main className="admin-main">
            {!doc ? (
            <p>Select a service or create a new one.</p>
            ) : (
            <>
                <div className="admin-tabs">
                <button className={mode === "form" ? "primary" : ""} onClick={() => switchMode("form")}>Form</button>
                {/* <button className={mode === "json" ? "primary" : ""} onClick={() => switchMode("json")}>JSON</button> */}
                </div>

                {mode === "form" ? (
                <>
                    <>
                    <Visibility doc={doc} onChange={setDoc} />
                    <Fields specs={coreFields} value={doc} onChange={setDoc} />
                    <Fields
                        specs={optionalFields.filter((s) => shown.includes(s.key))}
                        value={doc}
                        onChange={setDoc}
                    />

                    {/* {optionalFields.some((s) => !shown.includes(s.key)) && (
                        <div>
                        <label>Add section</label>
                        <select
                            value=""
                            onChange={(e) => e.target.value && setShown([...shown, e.target.value])}
                        >
                            <option value="">+ Choose a section to add...</option>
                            {optionalFields
                            .filter((s) => !shown.includes(s.key))
                            .map((s) => (
                                <option key={s.key} value={s.key}>{s.label}</option>
                            ))}
                        </select>
                        </div>
                    )} */}
                    </>
                </>

                ) : (
                <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)}
                    spellCheck={false} style={{ height: "70vh", fontFamily: "monospace" }} />
                )}

                <div className="admin-savebar">
                <button className="primary" onClick={save}>Save</button>
                {doc._id && <button className="danger" onClick={remove}>Delete</button>}
                <span className="admin-msg">{msg}</span>
                </div>
            </>
            )}
        </main>
    </div>
  );
}