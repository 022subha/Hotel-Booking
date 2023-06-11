import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import userRoute from "./routes/userRoute.js";
app.use("/api/auth", userRoute);

export default app;
