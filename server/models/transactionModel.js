import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
