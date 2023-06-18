
import cloudinary from "cloudinary";
import fs from "fs";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(201)
        .json({ status: false, message: "User Already Exists !!" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    if (req.files) {
      const fileData = fs.readFileSync(req.files.avatar.tempFilePath);
      const result = await cloudinary.v2.uploader.upload(fileData, {
        folder: "userAvatars",
      });

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar: result.secure_url,
      });

      await newUser.save();
    } else {
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
    }

    return res
      .status(200)
      .json({ status: true, message: "User Registered Successfully !!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Interna Server Error !!" });
  }
};

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
