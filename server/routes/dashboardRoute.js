import express from "express";
import { BookingDetails } from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/booking-details", BookingDetails);

export default router;
