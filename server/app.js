import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use(
  cors({
    origin: process.env.API_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 104857600 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

import userRoute from "./routes/userRoute.js";
app.use("/api/auth", userRoute);

export default app;
