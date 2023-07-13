import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bedsize: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  services: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{ type: String }],
  review: [{ type: mongoose.Types.ObjectId, ref: "Review", required: true }],
  unavailableDates: [{ type: String }],
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
