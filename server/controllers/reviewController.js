import Review from "../models/reviewModel.js";
import Room from "../models/roomModel.js";
import User from "../models/userModel.js";

export const addReview = async (req, res) => {
  try {
    const { userId, roomId, review } = req.body;
    const room = await Room.findById(roomId).populate("review");
    const newReview = new Review({ userId, roomId, review });
    await newReview.save();

    room.review.push(newReview);
    await room.save();

    const user = await User.findById(userId);
    user.review.push(newReview);
    await user.save();

    return res
      .status(200)
      .json({ status: true, message: "Review Added Successfully !!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Servaer Error !!" });
  }
};
