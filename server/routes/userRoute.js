import express from "express";
import { getUser, login, register } from "../controllers/userController.js";

const router = express.Router();

router.route("/get-user").post(getUser);
router.route("/register").post(register);
router.route("/login").post(login);

export default router;
