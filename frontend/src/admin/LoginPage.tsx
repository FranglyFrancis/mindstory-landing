import { useState } from "react";
import type { FormEvent } from "react";
import { api, errorMessage, setToken } from "./api";
import type { AdminUser } from "./api";
import PasswordInput from "./PasswordInput";

/* ---- edit this: the text shown on the left side of the login page ---- */
const COMPANY = {
  name: "Mindstory",
  tagline: "Manage everything your customers see.",
  description:
    "Update services, pages and content for your website from one place. Sign in with the email address your administrator set up for you.",
};

const MIN_PASSWORD_LENGTH = 8; // same rule as the server

type View = "login" | "forgot" | "reset";
type Note = { ok: boolean; text: string } | null;

const TITLES: Record<View, string> = {
  login: "Log in",
  forgot: "Reset your password",
  reset: "Choose a new password",
};

const SUBMIT_LABELS: Record<View, string> = {
  login: "Log in",
  forgot: "Send reset link",
  reset: "Save new password",
};

function post<T>(path: string, payload: unknown): Promise<T> {
  return api<T>(path, { method: "POST", body: JSON.stringify(payload) });
}

type LoginPageProps = {
  onLogin: (user: AdminUser) => void;
  resetToken: string;
  onResetDone: () => void;
};

export default function LoginPage({ onLogin, resetToken, onResetDone }: LoginPageProps) {
  const [view, setView] = useState<View>(resetToken ? "reset" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [note, setNote] = useState<Note>(null);
  const [busy, setBusy] = useState(false);

  function switchView(next: View) {
    setView(next);
    setNote(null);
    setPassword("");
    setConfirm("");
  }

  async function logIn() {
    const data = await post<{ token: string; user: AdminUser }>("/login", { email, password });
    setToken(data.token);
    onLogin(data.user);
  }

  async function sendResetLink() {
    const data = await post<{ message: string }>("/forgot-password", { email });
    setNote({ ok: true, text: data.message });
  }

  async function saveNewPassword() {
    if (password.length < MIN_PASSWORD_LENGTH) {
      setNote({ ok: false, text: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
      return;
    }
    if (password !== confirm) {
      setNote({ ok: false, text: "The two passwords don't match." });
      return;
    }

    await post("/reset-password", { token: resetToken, password });
    onResetDone();
    switchView("login");
    setNote({ ok: true, text: "Password updated. Log in with your new password." });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setNote(null);
    setBusy(true);

    try {
      if (view === "login") await logIn();
      else if (view === "forgot") await sendResetLink();
      else await saveNewPassword();
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    } finally {
      setBusy(false);
    }
  }

  function handleBackToLogin() {
    if (view === "reset") onResetDone();
    switchView("login");
  }

  return (
    <div className="auth">
      <section className="auth-brand">
        <div className="auth-brand-name">{COMPANY.name}</div>
        <div>
          <h1>{COMPANY.tagline}</h1>
          <p>{COMPANY.description}</p>
        </div>
        <small>
          © {new Date().getFullYear()} {COMPANY.name}
        </small>
      </section>

      <section className="auth-form">
        <form onSubmit={handleSubmit}>
          <h2>{TITLES[view]}</h2>
          {view === "forgot" && (
            <p className="ad-sub">Enter your email and we'll send you a link to set a new password.</p>
          )}

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
            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
            />
          )}

          {view === "reset" && (
            <>
              <PasswordInput
                id="new-password"
                label="New password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <PasswordInput
                id="confirm-password"
                label="Confirm new password"
                value={confirm}
                onChange={setConfirm}
                autoComplete="new-password"
              />
            </>
          )}

          {note && (
            <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>
              {note.text}
            </p>
          )}

          <button type="submit" className="ad-btn solid ad-wide" disabled={busy}>
            {busy ? "Please wait…" : SUBMIT_LABELS[view]}
          </button>

          {view === "login" && (
            <button type="button" className="ad-link" onClick={() => switchView("forgot")}>
              Forgot password?
            </button>
          )}
          {view !== "login" && (
            <button type="button" className="ad-link" onClick={handleBackToLogin}>
              Back to log in
            </button>
          )}
        </form>
      </section>
    </div>
  );
}