import crypto from "crypto";
import { razorpayInstance } from "../index.js";
import Booking from "../models/bookingModel.js";
import Room from "../models/roomModel.js";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

export const getKey = async (req, res) => {
  try {
    return res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error !!" });
  }
};

export const checkout = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };

    const order = await razorpayInstance.orders.create(options);

    return res
      .status(200)
      .json({ status: true, message: "Order Created Successfully !", order });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!" });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      id,
      amount,
      checkIn,
      checkOut,
      _id,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const newPayment = new Transaction({
        paymentId: razorpay_payment_id,
        user: id,
        amount,
      });

      await newPayment.save();

      const newBooking = new Booking({
        userId: id,
        roomId: _id,
        checkIn,
        checkOut,
        totalCost: amount,
        paymentStatus: "completed",
        bookingStatus: "completed",
      });

      await newBooking.save();

      const user = await User.findById(id)
        .populate("bookings")
        .populate("transactions");

      user.transactions.push(newPayment);
      user.bookings.push(newBooking);

      await user.save();

      const room = await Room.findById(_id);
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const date = new Date(start.getTime());

      while (date < end) {
        room.unavailableDates.push(date.toISOString().slice(0, 10));
        date.setDate(date.getDate() + 1);
      }

      await room.save();

      res
        .status(200)
        .json({ status: true, message: "Room Booked Successfully !!" });
    } else {
      res.status(400).json({
        status: false,
        message: "Payment Failed !!",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!" });
  }
};
