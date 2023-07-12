import Room from "../models/roomModel.js";
import Booking from "../models/bookingModel.js";
import Transaction from "../models/transactionModel.js";

export const BookingDetails = async (req, res) => {
  try {
    let booking = await Booking.find();
    const total_rooms = await Room.find({});
    let today_booking = await Transaction.find({});
    // console.log(booking);
    return res.status(200).json({
      status: true,
      message: "data found successfully",
      booking,
      today_booking,
      total_rooms,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error!!",
    });
  }
};
