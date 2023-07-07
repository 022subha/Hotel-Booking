import mongoose, { Mongoose } from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roomId: {
    type: mongoose.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "pending",
    required: true,
  },
  bookingStatus: {
    type: String,
    default: "pending",
    required: true,
  },
});

export default mongoose.model("Booking", bookingSchema);
