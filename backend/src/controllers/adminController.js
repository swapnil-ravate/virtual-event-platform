import { Booking } from "../models/Booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAdminStats = asyncHandler(async (_req, res) => {
  const bookings = await Booking.find();
  const totalRevenue = bookings
    .filter((booking) => booking.status === "Approved" && booking.paymentStatus === "Paid")
    .reduce((sum, booking) => sum + (booking.amount || 0), 0);
  const confirmedPaidClients = bookings.filter(
    (booking) => booking.status === "Approved" && booking.paymentStatus === "Paid"
  ).length;

  res.json({
    success: true,
    totalRevenue,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((booking) => booking.status === "Pending").length,
    confirmedPaidClients
  });
});
