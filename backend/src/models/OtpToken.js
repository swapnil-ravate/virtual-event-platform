import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    code: { type: String, required: true },
    purpose: { type: String, enum: ["account_activation", "booking_confirmation"], required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpToken = mongoose.model("OtpToken", otpTokenSchema);
