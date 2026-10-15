import { useEffect, useState } from "react";
import { api, clearToken, getToken, AdminUser } from "./api";
import LoginPage from "./LoginPage";
import AdminLayout from "./AdminLayout";
import "./admin.css";

/** Point your /admin route at this component (it replaces the old AdminPanel login). */
export default function AdminApp() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(!!getToken());
  const [resetToken, setResetToken] = useState(
    () => new URLSearchParams(window.location.search).get("reset") ?? ""
  );

  // restore the session after a refresh
  useEffect(() => {
    if (!getToken()) return;
    api<{ user: AdminUser }>("/me")
      .then((d) => setUser(d.user))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  // any 401 from the API drops back to the login page
  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener("admin-unauthorized", onExpired);
    return () => window.removeEventListener("admin-unauthorized", onExpired);
  }, []);

  function logout() {
    clearToken();
    setUser(null);
  }

  function finishReset() {
    window.history.replaceState({}, "", window.location.pathname); // remove ?reset=... from the address bar
    setResetToken("");
  }

  if (checking) return <div className="ad-loading">Loading…</div>;

  if (!user) {
    return <LoginPage onLogin={setUser} resetToken={resetToken} onResetDone={finishReset} />;
  }

  return <AdminLayout user={user} onLogout={logout} />;
}
