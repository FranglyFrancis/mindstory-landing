import { useState, FormEvent } from "react";
import { api, setToken, AdminUser } from "./api";

/* ---- edit this: the text shown on the left side of the login page ---- */
const COMPANY = {
  name: "Mindstory",
  tagline: "Manage everything your customers see.",
  description:
    "Update services, pages and content for your website from one place. Sign in with the email address your administrator set up for you.",
};

type View = "login" | "forgot" | "reset";
type Note = { ok: boolean; text: string } | null;

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

function PasswordInput({
  id, label, value, onChange, autoComplete,
}: { id: string; label: string; value: string; onChange: (v: string) => void; autoComplete: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="ad-field">
      <label htmlFor={id}>{label}</label>
      <div className="ad-pw">
        <input
          id={id}
          className="ad-input"
          type={visible ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        <button
          type="button"
          className="ad-pw-toggle"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <EyeIcon off={visible} />
        </button>
      </div>
    </div>
  );
}

export default function LoginPage({
  onLogin, resetToken, onResetDone,
}: { onLogin: (u: AdminUser) => void; resetToken: string; onResetDone: () => void }) {
  const [view, setView] = useState<View>(resetToken ? "reset" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [note, setNote] = useState<Note>(null);
  const [busy, setBusy] = useState(false);

  function go(next: View) {
    setView(next);
    setNote(null);
    setPassword("");
    setConfirm("");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setNote(null);
    setBusy(true);
    try {
      if (view === "login") {
        const data = await api<{ token: string; user: AdminUser }>("/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        setToken(data.token);
        onLogin(data.user);
        return;
      }

      if (view === "forgot") {
        const data = await api<{ message: string }>("/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        setNote({ ok: true, text: data.message });
        return;
      }

      // reset
      if (password.length < 8) return setNote({ ok: false, text: "Password must be at least 8 characters." });
      if (password !== confirm) return setNote({ ok: false, text: "The two passwords don't match." });
      await api("/reset-password", { method: "POST", body: JSON.stringify({ token: resetToken, password }) });
      onResetDone();
      go("login");
      setNote({ ok: true, text: "Password updated. Log in with your new password." });
    } catch (err: any) {
      setNote({ ok: false, text: err.message });
    } finally {
      setBusy(false);
    }
  }

  const titles: Record<View, string> = {
    login: "Log in",
    forgot: "Reset your password",
    reset: "Choose a new password",
  };

  return (
    <div className="auth">
      <section className="auth-brand">
        <div className="auth-brand-name">{COMPANY.name}</div>
        <div>
          <h1>{COMPANY.tagline}</h1>
          <p>{COMPANY.description}</p>
        </div>
        <small>© {new Date().getFullYear()} {COMPANY.name}</small>
      </section>

      <section className="auth-form">
        <form onSubmit={submit} noValidate={false}>
          <h2>{titles[view]}</h2>
          {view === "forgot" && <p className="ad-sub">Enter your email and we'll send you a link to set a new password.</p>}

          {view !== "reset" && (
            <div className="ad-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="ad-input"
                type="email"
                value={email}
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          {view === "login" && (
            <PasswordInput id="password" label="Password" value={password} onChange={setPassword} autoComplete="current-password" />
          )}

          {view === "reset" && (
            <>
              <PasswordInput id="new-password" label="New password" value={password} onChange={setPassword} autoComplete="new-password" />
              <PasswordInput id="confirm-password" label="Confirm new password" value={confirm} onChange={setConfirm} autoComplete="new-password" />
            </>
          )}

          {note && (
            <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>
              {note.text}
            </p>
          )}

          <button className="ad-btn solid ad-wide" disabled={busy}>
            {busy
              ? "Please wait…"
              : view === "login" ? "Log in" : view === "forgot" ? "Send reset link" : "Save new password"}
          </button>

          {view === "login" && (
            <button type="button" className="ad-link" onClick={() => go("forgot")}>Forgot password?</button>
          )}
          {view !== "login" && (
            <button
              type="button"
              className="ad-link"
              onClick={() => { if (view === "reset") onResetDone(); go("login"); }}
            >
              Back to log in
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
