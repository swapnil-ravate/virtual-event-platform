import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { env } from "../config/env.js";
import { createAndSendOtp, verifyOtp } from "../services/otpService.js";

const createToken = (userId) =>
  jwt.sign({ sub: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "name, email and password are required");
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(409, "Email already registered");
  }

  const normalizedEmail = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name, email: normalizedEmail, passwordHash, isActive: false });
  await createAndSendOtp({ email: normalizedEmail, purpose: "account_activation" });

  res.status(201).json({
    success: true,
    message: "Registration successful. OTP sent to email for activation.",
    requiresActivation: true,
    email: normalizedEmail
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  if (!user.isActive) {
    await createAndSendOtp({ email: user.email, purpose: "account_activation" });
    res.status(403).json({
      success: false,
      requiresActivation: true,
      message: "Account is not activated. OTP sent to your email.",
      email: user.email
    });
    return;
  }
  const token = createToken(user._id.toString());
  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

export const verifyActivationOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new ApiError(400, "email and otp are required");
  }

  const normalizedEmail = email.toLowerCase();
  await verifyOtp({
    email: normalizedEmail,
    purpose: "account_activation",
    code: otp
  });

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.isActive = true;
  await user.save();

  const token = createToken(user._id.toString());
  res.json({
    success: true,
    message: "Account activated successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

export const resendActivationOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "email is required");
  }
  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (user.isActive) {
    throw new ApiError(400, "Account is already active");
  }
  await createAndSendOtp({ email: normalizedEmail, purpose: "account_activation" });
  res.json({ success: true, message: "Activation OTP resent successfully." });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});
