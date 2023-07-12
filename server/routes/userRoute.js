import express from "express";
import {
  getAllBookings,
  getBookDetailByUserId,
  getUser,
  login,
  register,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/adminAuth.js";
const router = express.Router();

router.route("/get-user").post(getUser);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getAllBookings").get(authMiddleware, getAllBookings);
router.post("/getBookingByUser", getBookDetailByUserId);
export default router;
