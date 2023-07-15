import express from "express";
import { addReview } from "../controllers/reviewController.js";

const router = express.Router();

router.route("/add-review").post(addReview);

export default router;
