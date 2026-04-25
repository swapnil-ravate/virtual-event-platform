import { Router } from "express";
import {
  login,
  me,
  register,
  resendActivationOtp,
  verifyActivationOtp
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-activation-otp", verifyActivationOtp);
router.post("/resend-activation-otp", resendActivationOtp);
router.get("/me", requireAuth, me);

export default router;
