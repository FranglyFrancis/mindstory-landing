import { useEffect, useState } from "react";
import { api, clearToken, getToken } from "./api";
import type { AdminUser } from "./api";
import LoginPage from "./LoginPage";
import AdminLayout from "./AdminLayout";
import "./admin.css";

// Fired by the API helper whenever the server answers 401. Must match the name used in api.ts.
const UNAUTHORIZED_EVENT = "admin-unauthorized";

const readResetToken = (): string =>
  new URLSearchParams(window.location.search).get("reset") ?? "";

/** Point your /admin route at this component (it replaces the old AdminPanel login). */
export default function AdminApp() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(Boolean(getToken()));
  const [resetToken, setResetToken] = useState(readResetToken);

  // Restore the session after a refresh.
  useEffect(() => {
    if (!getToken()) return;

    api<{ user: AdminUser }>("/me")
      .then((data) => setUser(data.user))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  // Any 401 from the API drops back to the login page.
  useEffect(() => {
    const handleExpired = () => setUser(null);
    window.addEventListener(UNAUTHORIZED_EVENT, handleExpired);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleExpired);
  }, []);

  function handleLogout() {
    clearToken();
    setUser(null);
  }

  function handleResetDone() {
    // Remove ?reset=... from the address bar so the token doesn't stay in history or get shared.
    window.history.replaceState({}, "", window.location.pathname);
    setResetToken("");
  }

  if (checking) return <div className="ad-loading">Loading…</div>;

  if (!user) {
    return <LoginPage onLogin={setUser} resetToken={resetToken} onResetDone={handleResetDone} />;
  }

  return <AdminLayout user={user} onLogout={handleLogout} />;
}