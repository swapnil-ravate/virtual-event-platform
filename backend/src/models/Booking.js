import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Cancelled"], default: "Pending" },
    paymentStatus: { type: String, enum: ["Not Paid", "Paid"], default: "Not Paid" },
    amount: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, event: 1 }, { unique: true });

export const Booking = mongoose.model("Booking", bookingSchema);
