import { useState } from "react";

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "current-password" | "new-password";
};

export default function PasswordInput({ id, label, value, onChange, autoComplete }: PasswordInputProps) {
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
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <EyeIcon off={visible} />
        </button>
      </div>
    </div>
  );
}