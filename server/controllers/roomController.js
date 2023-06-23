import roomModel from "../models/roomModel.js";
import cloudinary from "cloudinary";

export const addRooms = async (req, res) => {
  try {
    const {
      Name,
      Size,
      Capacity,
      Bedsize,
      Services,
      Description,
      Location,
      Price,
      Image,
    } = req.body;

    if (req.files && req.files.Image) {
      const uploadPromises = req.files.Image.map((file) => {
        return cloudinary.v2.uploader.upload(file.tempFilePath, {
          folder: "HotelRooms",
        });
      });

      const results = await Promise.all(uploadPromises);
      // Process the uploaded images or store the results as needed
    }

    const room = new roomModel({
      Name,
      Size,
      Capacity,
      Bedsize,
      Services,
      Description,
      Location,
      Price,
      Image: results.secure_url,
    });
    await room.save();
    return res
      .status(200)
      .json({ status: true, message: "Rooms data uploaded successfully!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ status: false, message: "Internal Server Error!!!" });
  }
};
