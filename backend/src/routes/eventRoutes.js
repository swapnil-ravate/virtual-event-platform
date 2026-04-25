import { Router } from "express";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controllers/eventController.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getEvents);
router.post("/", requireAuth, requireAdmin, createEvent);
router.put("/:id", requireAuth, requireAdmin, updateEvent);
router.delete("/:id", requireAuth, requireAdmin, deleteEvent);

export default router;
