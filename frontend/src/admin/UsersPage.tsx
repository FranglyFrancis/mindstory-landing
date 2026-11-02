import { useCallback, useEffect, useState } from "react";
import { api, errorMessage } from "./api";
import type { AdminUser } from "./api";
import UserForm from "./userForm";
import UserTable from "./UserTable";
import type { NewUser, Note } from "./userTypes";

export default function UsersPage({ user }: { user: AdminUser }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [note, setNote] = useState<Note>(null);

  const load = useCallback(async () => {
    try {
      setUsers(await api<AdminUser[]>("/users"));
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Runs a request, then shows a success message and reloads, or shows the error. Returns true on success.
  async function run(request: () => Promise<unknown>, successText: string): Promise<boolean> {
    setNote(null);
    try {
      await request();
      setNote({ ok: true, text: successText });
      await load();
      return true;
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
      return false;
    }
  }

  const createUser = (newUser: NewUser) =>
    run(
      () => api("/users", { method: "POST", body: JSON.stringify(newUser) }),
      `Created ${newUser.email}. Share the password with them, they can change it with "Forgot password?".`
    );

  const updateUser = (target: AdminUser, body: Record<string, unknown>, successText: string) =>
    run(() => api(`/users/${target._id}`, { method: "PUT", body: JSON.stringify(body) }), successText);

  async function setPassword(target: AdminUser, password: string) {
    await updateUser(target, { password }, `Password changed for ${target.email}.`);
  }

  function toggleActive(target: AdminUser) {
    const result = target.active ? "deactivated" : "activated";
    void updateUser(target, { active: !target.active }, `${target.email} ${result}.`);
  }

  function deleteUser(target: AdminUser) {
    if (!window.confirm(`Delete ${target.email}? This can't be undone.`)) return;
    void run(() => api(`/users/${target._id}`, { method: "DELETE" }), `Deleted ${target.email}.`);
  }

  return (
    <div className="ad-page">
      <h2>Users</h2>
      <p className="ad-sub">People who can log in to this dashboard.</p>

      <UserForm onCreate={createUser} />

      {note && (
        <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>
          {note.text}
        </p>
      )}

      <UserTable
        users={users}
        currentUserId={user._id}
        onSetPassword={setPassword}
        onToggleActive={toggleActive}
        onDelete={deleteUser}
      />
    </div>
  );
}