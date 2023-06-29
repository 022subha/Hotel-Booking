import express from "express";
import { addRooms, getAllRooms,editRoomById, getRoomById } from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/adminAuth.js";
const router = express.Router();

router.post("/add-rooms", authMiddleware,addRooms);
router.get("/getAllRooms",authMiddleware,getAllRooms);
router.post("/editRoom/:id",authMiddleware,editRoomById);
router.post("/getRoomById/:id",getRoomById)
export default router;
