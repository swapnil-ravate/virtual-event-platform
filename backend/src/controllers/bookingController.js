import { Booking } from "../models/Booking.js";
import { Event } from "../models/Event.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { sendEmail } from "../services/emailService.js";
import { createAndSendOtp, verifyOtp } from "../services/otpService.js";

const mapBooking = (booking) => ({
  id: booking._id.toString(),
  status: booking.status,
  paymentStatus: booking.paymentStatus,
  amount: booking.amount,
  createdAt: booking.createdAt,
  event: booking.event
    ? {
        id: booking.event._id.toString(),
        title: booking.event.title,
        image: booking.event.image,
        date: booking.event.date,
        time: booking.event.time,
        type: booking.event.type
      }
    : null
});

export const requestBookingOtp = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) {
    throw new ApiError(400, "eventId is required");
  }

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  const pendingOrApprovedCount = await Booking.countDocuments({
    event: event._id,
    status: { $in: ["Pending", "Approved"] }
  });
  if (pendingOrApprovedCount >= event.capacity) {
    throw new ApiError(400, "Event is fully booked");
  }

  const existingBooking = await Booking.findOne({
    user: req.user._id,
    event: event._id,
    status: { $in: ["Pending", "Approved"] }
  });
  if (existingBooking) {
    throw new ApiError(409, "You already have an active booking request for this event");
  }

  await createAndSendOtp({
    email: req.user.email,
    purpose: "booking_confirmation",
    metadata: { eventId: event._id.toString() }
  });

  res.json({
    success: true,
    message: "Booking OTP sent to your email",
    eventId: event._id.toString()
  });
});

export const createBooking = asyncHandler(async (req, res) => {
  const { eventId, otp } = req.body;
  if (!eventId || !otp) {
    throw new ApiError(400, "eventId and otp are required");
  }

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  const token = await verifyOtp({
    email: req.user.email,
    purpose: "booking_confirmation",
    code: otp
  });

  const tokenEventId = String(token?.metadata?.eventId || "");
  if (tokenEventId !== event._id.toString()) {
    throw new ApiError(400, "OTP does not match this booking request");
  }

  const pendingOrApprovedCount = await Booking.countDocuments({
    event: event._id,
    status: { $in: ["Pending", "Approved"] }
  });
  if (pendingOrApprovedCount >= event.capacity) {
    throw new ApiError(400, "Event is fully booked");
  }

  const existingBooking = await Booking.findOne({
    user: req.user._id,
    event: event._id,
    status: { $in: ["Pending", "Approved"] }
  });
  if (existingBooking) {
    throw new ApiError(409, "You already have an active booking request for this event");
  }

  const booking = await Booking.create({
    user: req.user._id,
    event: event._id,
    amount: event.price,
    status: "Pending",
    paymentStatus: event.price > 0 ? "Not Paid" : "Paid"
  });

  const fullBooking = await Booking.findById(booking._id).populate("event");
  res.status(201).json({
    success: true,
    message: "Booking request submitted and is pending admin review",
    booking: mapBooking(fullBooking)
  });
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("event")
    .sort({ createdAt: -1 });
  res.json({ success: true, bookings: bookings.map(mapBooking) });
});

export const cancelMyBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  booking.status = "Cancelled";
  await booking.save();
  res.json({ success: true, message: "Booking cancelled" });
});

export const getAllBookings = asyncHandler(async (_req, res) => {
  const bookings = await Booking.find()
    .populate("event")
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json({ success: true, bookings });
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, paymentStatus } = req.body;
  const booking = await Booking.findById(req.params.id).populate("event").populate("user", "email name");
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  if (status === "Approved") {
    const approvedCount = await Booking.countDocuments({
      _id: { $ne: booking._id },
      event: booking.event._id,
      status: "Approved"
    });
    if (approvedCount >= booking.event.capacity) {
      throw new ApiError(400, "Cannot approve booking. Event capacity reached.");
    }
  }

  if (status) booking.status = status;
  if (paymentStatus) booking.paymentStatus = paymentStatus;
  await booking.save();

  if (booking.status === "Approved") {
    await sendEmail({
      to: booking.user.email,
      subject: "Booking Approved",
      html: `<p>Your booking for <strong>${booking.event.title}</strong> is approved.</p>`
    });
  }

  res.json({ success: true, booking });
});
