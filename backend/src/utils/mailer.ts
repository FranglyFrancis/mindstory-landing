import nodemailer from "nodemailer";

/**
 * Sends an email through SMTP.
 * If SMTP_HOST is not set (local development) the email is printed to the server console instead,
 * so you can copy the reset link from the terminal.
 */
export async function sendMail(to: string, subject: string, text: string, html?: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;

  if (!SMTP_HOST) {
    console.log(`\n[mail not configured] To: ${to}\nSubject: ${subject}\n${text}\n`);
    return;
  }

  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({ from: MAIL_FROM ?? SMTP_USER, to, subject, text, html });
}
