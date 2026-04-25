import crypto from "crypto";
import { OtpToken } from "../models/OtpToken.js";
import { sendEmail } from "./emailService.js";
import { ApiError } from "../utils/apiError.js";

const OTP_EXPIRY_MINUTES = 10;

const generateCode = () => crypto.randomInt(100000, 999999).toString();
const normalizeEmail = (email) => String(email || "").trim().toLowerCase();
const normalizeOtp = (code) => String(code || "").trim().replace(/\s+/g, "");

export const createAndSendOtp = async ({ email, purpose, metadata = {} }) => {
  const normalizedEmail = normalizeEmail(email);
  const code = generateCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await OtpToken.findOneAndDelete({ email: normalizedEmail, purpose });
  await OtpToken.create({ email: normalizedEmail, code, purpose, metadata, expiresAt });

  await sendEmail({
    to: normalizedEmail,
    subject: purpose === "account_activation" ? "Account Verification OTP" : "Booking Verification OTP",
    html: `<p>Your OTP is <strong>${code}</strong>. It expires in ${OTP_EXPIRY_MINUTES} minutes.</p>`
  });
};

export const verifyOtp = async ({ email, purpose, code }) => {
  const normalizedEmail = normalizeEmail(email);
  const normalizedOtp = normalizeOtp(code);
  const token = await OtpToken.findOne({ email: normalizedEmail, purpose });
  if (!token || token.code !== normalizedOtp || token.expiresAt < new Date()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }
  await OtpToken.findByIdAndDelete(token._id);
  return token;
};
