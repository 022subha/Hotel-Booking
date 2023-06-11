import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import fs from "fs";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(201)
        .json({ status: false, message: "User Already Exists !!" });
    }

    const hashedPassword = bcryptjs.hashSync(password);

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
