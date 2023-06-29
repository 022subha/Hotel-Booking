import express from "express";
import {
  addRooms,
  getAllRooms,
  editRoomById,
  getRoomById,
} from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/adminAuth.js";
const router = express.Router();

router.post("/add-rooms", addRooms);
router.get("/getAllRooms", getAllRooms);
router.post("/editRoom/:id", authMiddleware, editRoomById);
router.post("/getRoomById", getRoomById);
export default router;
