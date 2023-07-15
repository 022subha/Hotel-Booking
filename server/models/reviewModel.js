import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
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
  review: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
