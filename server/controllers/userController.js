import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let existinguser;
    existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res
        .status(201)
        .json({ status: false, message: "User Not Available!!" });
    }
    const isMatch = bcrypt.compare(password, existinguser.password);
    if (!isMatch) {
      return res
        .status(201)
        .json({ status: false, message: "Error in Password!!" });
    }
    const token = jwt.sign(
      {
        id: existinguser._id,
      },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ status: true, message: "Login Successfully!!!", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
