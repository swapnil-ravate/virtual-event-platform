import { Router } from "express";
import { getAdminStats } from "../controllers/adminController.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/stats", requireAuth, requireAdmin, getAdminStats);

export default router;
