import mongoose from "mongoose";

const agendaItemSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    title: { type: String, required: true }
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["Live", "Upcoming", "On-Demand"], default: "Upcoming" },
    attendees: { type: Number, default: 0 },
    price: { type: Number, default: 0, min: 0 },
    location: { type: String, default: "Virtual" },
    capacity: { type: Number, required: true, min: 1 },
    agenda: { type: [agendaItemSchema], default: [] }
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
