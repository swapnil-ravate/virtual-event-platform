import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5001),
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/virtual-events",
  jwtSecret: process.env.JWT_SECRET || "change-this-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  emailHost: process.env.EMAIL_HOST || "",
  emailPort: Number(process.env.EMAIL_PORT || 587),
  emailUser: process.env.EMAIL_USER || "",
  emailPass: process.env.EMAIL_PASS || "",
  emailFrom: process.env.EMAIL_FROM || "no-reply@virtualevents.local",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173"
};
