import { useEffect, useState, FormEvent } from "react";
import { api, AdminUser } from "./api";

type Note = { ok: boolean; text: string } | null;
const empty = { name: "", email: "", password: "", role: "admin" };

export default function UsersPage({ user }: { user: AdminUser }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState(empty);
  const [note, setNote] = useState<Note>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setUsers(await api<AdminUser[]>("/users"));
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    }
  }

  useEffect(() => { load(); }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNote(null);
    try {
      await api("/users", { method: "POST", body: JSON.stringify(form) });
      setForm(empty);
      setNote({ ok: true, text: `Created ${form.email}. Share the password with them, they can change it with "Forgot password?".` });
      await load();
    } catch (err: any) {
      setNote({ ok: false, text: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function update(u: AdminUser, body: Record<string, unknown>, okText: string) {
    setNote(null);
    try {
      await api(`/users/${u._id}`, { method: "PUT", body: JSON.stringify(body) });
      setNote({ ok: true, text: okText });
      await load();
    } catch (err: any) {
      setNote({ ok: false, text: err.message });
    }
  }

  function setPassword(u: AdminUser) {
    const p = window.prompt(`New password for ${u.email} (at least 8 characters)`);
    if (p) update(u, { password: p }, `Password changed for ${u.email}.`);
  }

  async function remove(u: AdminUser) {
    if (!window.confirm(`Delete ${u.email}? This can't be undone.`)) return;
    setNote(null);
    try {
      await api(`/users/${u._id}`, { method: "DELETE" });
      setNote({ ok: true, text: `Deleted ${u.email}.` });
      await load();
    } catch (err: any) {
      setNote({ ok: false, text: err.message });
    }
  }

  return (
    <div className="ad-page">
      <h2>Users</h2>
      <p className="ad-sub">People who can log in to this dashboard.</p>

      <form className="ad-card ad-user-form" onSubmit={create}>
        <h3>Add user</h3>
        <div className="ad-grid">
          <div className="ad-field">
            <label htmlFor="u-name">Name</label>
            <input id="u-name" className="ad-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="ad-field">
            <label htmlFor="u-email">Email</label>
            <input id="u-email" className="ad-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="ad-field">
            <label htmlFor="u-pass">Password</label>
            <input id="u-pass" className="ad-input" type="password" minLength={8} required autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div className="ad-field">
            <label htmlFor="u-role">Role</label>
            <select id="u-role" className="ad-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="admin">Admin</option>
              <option value="superadmin">Super admin</option>
            </select>
          </div>
        </div>
        <button className="ad-btn solid" disabled={busy}>{busy ? "Adding…" : "Add user"}</button>
      </form>

      {note && <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>{note.text}</p>}

      <div className="ad-table-wrap">
        <table className="ad-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const self = u._id === user._id;
              return (
                <tr key={u._id}>
                  <td>{u.name || "—"}{self && <small> (you)</small>}</td>
                  <td>{u.email}</td>
                  <td>{u.role === "superadmin" ? "Super admin" : "Admin"}</td>
                  <td>{u.active ? "Active" : "Deactivated"}</td>
                  <td className="ad-actions">
                    <button className="ad-btn small" onClick={() => setPassword(u)}>Set password</button>
                    {!self && (
                      <>
                        <button
                          className="ad-btn small"
                          onClick={() => update(u, { active: !u.active }, `${u.email} ${u.active ? "deactivated" : "activated"}.`)}
                        >
                          {u.active ? "Deactivate" : "Activate"}
                        </button>
                        <button className="ad-btn small danger" onClick={() => remove(u)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
