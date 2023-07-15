import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use(
  cors({
    origin: "https://stayeasy.vercel.app ",
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

import dashboardRoute from "./routes/dashboardRoute.js";
import paymentRoute from "./routes/paymnetRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import roomRoute from "./routes/roomRoutes.js";
import userRoute from "./routes/userRoute.js";
import contactRoute from "./routes/contactRoute.js";
app.use("/api/dashboard", dashboardRoute);
app.use("/api/auth", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/room", roomRoute);
app.use("/api/contact",contactRoute);
app.use("/api/review", reviewRoute);

export default app;
