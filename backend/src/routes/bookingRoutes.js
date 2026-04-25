import { Router } from "express";
import {
  cancelMyBooking,
  createBooking,
  getAllBookings,
  getMyBookings,
  requestBookingOtp,
  updateBookingStatus
} from "../controllers/bookingController.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/request-otp", requireAuth, requestBookingOtp);
router.post("/", requireAuth, createBooking);
router.get("/my", requireAuth, getMyBookings);
router.delete("/:id", requireAuth, cancelMyBooking);

router.get("/", requireAuth, requireAdmin, getAllBookings);
router.patch("/:id/status", requireAuth, requireAdmin, updateBookingStatus);

export default router;
