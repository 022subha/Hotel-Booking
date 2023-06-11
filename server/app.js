import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

import userRoute from "./routes/userRoute.js";
app.use("/api/auth", userRoute);

export default app;
