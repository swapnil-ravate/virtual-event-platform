import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";

export const requireAuth = async (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub).select("-passwordHash");
    if (!user) {
      throw new ApiError(401, "Invalid token");
    }
    if (!user.isActive) {
      throw new ApiError(403, "Account is not active");
    }
    req.user = user;
    next();
  } catch {
    next(new ApiError(401, "Invalid token"));
  }
};

export const requireAdmin = (req, _res, next) => {
  if (req.user?.role !== "admin") {
    return next(new ApiError(403, "Admin access required"));
  }
  next();
};
