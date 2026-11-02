import { useState } from "react";
import type { FormEvent } from "react";
import { EMPTY_USER, MIN_PASSWORD_LENGTH } from "./userTypes";
import type { NewUser } from "./userTypes";

type UserFormProps = {
  onCreate: (user: NewUser) => Promise<boolean>; // true when the user was created
};

export default function UserForm({ onCreate }: UserFormProps) {
  const [form, setForm] = useState<NewUser>(EMPTY_USER);
  const [busy, setBusy] = useState(false);

  const update = <K extends keyof NewUser>(field: K, value: NewUser[K]) =>
    setForm((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);

    const created = await onCreate(form);
    if (created) setForm(EMPTY_USER);

    setBusy(false);
  }

  return (
    <form className="ad-card ad-user-form" onSubmit={handleSubmit}>
      <h3>Add user</h3>

      <div className="ad-grid">
        <div className="ad-field">
          <label htmlFor="u-name">Name</label>
          <input id="u-name" className="ad-input" value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>

        <div className="ad-field">
          <label htmlFor="u-email">Email</label>
          <input
            id="u-email"
            className="ad-input"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        <div className="ad-field">
          <label htmlFor="u-pass">Password</label>
          <input
            id="u-pass"
            className="ad-input"
            type="password"
            minLength={MIN_PASSWORD_LENGTH}
            required
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
        </div>

        <div className="ad-field">
          <label htmlFor="u-role">Role</label>
          <select
            id="u-role"
            className="ad-input"
            value={form.role}
            onChange={(e) => update("role", e.target.value as NewUser["role"])}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super admin</option>
          </select>
        </div>
      </div>

      <button type="submit" className="ad-btn solid" disabled={busy}>
        {busy ? "Adding…" : "Add user"}
      </button>
    </form>
  );
}