import express from "express";
import {
  checkout,
  getKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/get-key").get(getKey);
router.route("/checkout").post(checkout);
router.route("/payment-verification").post(paymentVerification);

export default router;
