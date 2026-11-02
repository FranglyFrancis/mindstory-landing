import { useState } from "react";
import type { FormEvent } from "react";
import type { AdminUser } from "./api";
import { MIN_PASSWORD_LENGTH, roleLabel } from "./userTypes";

/* ---------- set password (replaces the browser prompt, so the password is hidden while typing) ---------- */
type PasswordRowProps = {
  email: string;
  onSave: (password: string) => Promise<void>;
  onCancel: () => void;
};

function PasswordRow({ email, onSave, onCancel }: PasswordRowProps) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    await onSave(password);
    setBusy(false);
  }

  return (
    <form className="ad-actions" onSubmit={handleSubmit}>
      <label className="ad-sr" htmlFor="u-new-pass">
        New password for {email}
      </label>
      <input
        id="u-new-pass"
        className="ad-input"
        type="password"
        required
        autoFocus
        minLength={MIN_PASSWORD_LENGTH}
        autoComplete="new-password"
        placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="ad-btn small solid" disabled={busy}>
        Save
      </button>
      <button type="button" className="ad-btn small" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

/* ---------- table ---------- */
type UserTableProps = {
  users: AdminUser[];
  currentUserId: string;
  onSetPassword: (user: AdminUser, password: string) => Promise<void>;
  onToggleActive: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
};

export default function UserTable({ users, currentUserId, onSetPassword, onToggleActive, onDelete }: UserTableProps) {
  const [editingPasswordId, setEditingPasswordId] = useState<string | null>(null);

  return (
    <div className="ad-table-wrap">
      <table className="ad-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user._id === currentUserId;

            return (
              <tr key={user._id}>
                <td>
                  {user.name || "—"}
                  {isSelf && <small> (you)</small>}
                </td>
                <td>{user.email}</td>
                <td>{roleLabel(user.role)}</td>
                <td>{user.active ? "Active" : "Deactivated"}</td>
                <td>
                  {editingPasswordId === user._id ? (
                    <PasswordRow
                      email={user.email}
                      onCancel={() => setEditingPasswordId(null)}
                      onSave={async (password) => {
                        await onSetPassword(user, password);
                        setEditingPasswordId(null);
                      }}
                    />
                  ) : (
                    <div className="ad-actions">
                      <button type="button" className="ad-btn small" onClick={() => setEditingPasswordId(user._id)}>
                        Set password
                      </button>
                      {!isSelf && (
                        <>
                          <button type="button" className="ad-btn small" onClick={() => onToggleActive(user)}>
                            {user.active ? "Deactivate" : "Activate"}
                          </button>
                          <button type="button" className="ad-btn small danger" onClick={() => onDelete(user)}>
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}