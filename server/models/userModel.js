import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  avatar: { type: String },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking", required: true }],
  transactions: [
    { type: mongoose.Types.ObjectId, ref: "Transaction", required: true },
  ],
  review: [{ type: mongoose.Types.ObjectId, ref: "Review", required: true }],
  isAdmin: { type: Boolean, required: true, default: false },
  notification: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Contact",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
