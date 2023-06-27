import cloudinary from "cloudinary";
import roomModel from "../models/roomModel.js";

export const addRooms = async (req, res) => {
  try {
    console.log(req.body);
    const { name, bedsize, capacity, services, description, price } = req.body;

    const results = [];
    if (req.files && req.files.images) {
      for (let i = 0; i < req.files.images.length; i++) {
        const imageData = await cloudinary.v2.uploader.upload(
          req.files.images[i].tempFilePath,
          {
            folder: "HotelRooms",
          }
        );

        results.push(imageData.secure_url);
      }
    }

    const room = new roomModel({
      name,
      bedsize,
      capacity,
      services,
      description,
      price,
      images: results,
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
