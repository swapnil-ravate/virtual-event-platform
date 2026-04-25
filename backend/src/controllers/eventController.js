import { Event } from "../models/Event.js";
import { Booking } from "../models/Booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const toClientEvent = (eventDoc, reservedSeats = 0) => ({
  id: eventDoc._id.toString(),
  title: eventDoc.title,
  description: eventDoc.description,
  image: eventDoc.image,
  date: eventDoc.date,
  time: eventDoc.time,
  category: eventDoc.category,
  type: eventDoc.type,
  attendees: eventDoc.attendees,
  price: eventDoc.price,
  location: eventDoc.location,
  capacity: eventDoc.capacity,
  availableSeats: Math.max(eventDoc.capacity - reservedSeats, 0),
  agenda: eventDoc.agenda
});

export const getEvents = asyncHandler(async (_req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  const reservedByEvent = await Booking.aggregate([
    { $match: { status: { $in: ["Pending", "Approved"] } } },
    { $group: { _id: "$event", count: { $sum: 1 } } }
  ]);
  const reserveMap = new Map(reservedByEvent.map((row) => [row._id.toString(), row.count]));
  res.json({
    success: true,
    events: events.map((eventDoc) => toClientEvent(eventDoc, reserveMap.get(eventDoc._id.toString()) || 0))
  });
});

export const createEvent = asyncHandler(async (req, res) => {
  const required = ["title", "description", "image", "date", "time", "category", "capacity"];
  for (const field of required) {
    if (!req.body[field]) {
      throw new ApiError(400, `${field} is required`);
    }
  }

  const created = await Event.create(req.body);
  res.status(201).json({ success: true, event: toClientEvent(created, 0) });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    throw new ApiError(404, "Event not found");
  }
  res.json({ success: true, event: toClientEvent(updated, 0) });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const deleted = await Event.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw new ApiError(404, "Event not found");
  }
  res.json({ success: true, message: "Event deleted" });
});
