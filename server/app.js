import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

const app = express();

// app.use(
//   cors({
//     origin: "https://stayeasy.vercel.app ",
//   })
// );
app.use(cors());
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

import roomRoute from "./routes/roomRoutes.js";
app.use("/api/rooms", roomRoute);

export default app;
