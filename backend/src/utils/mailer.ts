import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../config/env.js";

const SECURE_SMTP_PORT = 465;

let transporter: Transporter | null = null;

// Created once and reused, instead of opening a new connection for every email.
function getTransporter(host: string): Transporter {
  if (!transporter) {
    const { port, user, pass } = env.smtp;
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === SECURE_SMTP_PORT,
      auth: user ? { user, pass } : undefined,
    });
  }
  return transporter;
}

/**
 * Sends an email through SMTP.
 * If SMTP_HOST is not set during local development, the email is printed to the server console instead,
 * so you can copy the reset link from the terminal.
 */
export async function sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
  const { host, user, from } = env.smtp;

  if (!host) {
    if (env.isProduction) {
      throw new Error("Email is not configured: set SMTP_HOST (and the other SMTP_* variables).");
    }
    console.log(`\n[mail not configured] To: ${to}\nSubject: ${subject}\n${text}\n`);
    return;
  }

  await getTransporter(host).sendMail({ from: from ?? user, to, subject, text, html });
}