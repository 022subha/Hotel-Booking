import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use(
  cors(/* {
    origin: "https://stayeasy.vercel.app ",
  } */)
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

import paymentRoute from "./routes/paymnetRoute.js";
import userRoute from "./routes/userRoute.js";
app.use("/api/auth", userRoute);
app.use("/api/payment", paymentRoute);

import roomRoute from "./routes/roomRoutes.js";
app.use("/api/room", roomRoute);

export default app;
