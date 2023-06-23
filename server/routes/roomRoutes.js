import express from "express";
import { addRooms } from "../controllers/roomController.js";
const router = express.Router();

router.post("/add-rooms", addRooms);
export default router;
