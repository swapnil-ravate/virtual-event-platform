import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const canSendRealEmail = Boolean(env.emailHost && env.emailUser && env.emailPass);

const transporter = canSendRealEmail
  ? nodemailer.createTransport({
      host: env.emailHost,
      port: env.emailPort,
      secure: env.emailPort === 465,
      auth: { user: env.emailUser, pass: env.emailPass }
    })
  : null;

export const sendEmail = async ({ to, subject, html }) => {
  if (!canSendRealEmail) {
    console.log(`[EMAIL MOCK] to=${to} subject=${subject}`);
    return;
  }

  await transporter.sendMail({
    from: env.emailFrom,
    to,
    subject,
    html
  });
};
