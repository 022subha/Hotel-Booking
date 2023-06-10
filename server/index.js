import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
try {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}
