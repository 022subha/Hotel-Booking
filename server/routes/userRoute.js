import express from "express";
import { login, register } from "../controllers/userController.js";

const router = express.Router();

router.post("/register",register);
router.route("/login").post(login);
export default router;
