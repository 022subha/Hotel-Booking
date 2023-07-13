import cloudinary from "cloudinary";
import Room from "../models/roomModel.js";

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

    const room = new Room({
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

//getting all rooms api
export const getAllRooms = async (req, res) => {
  try {
    let rooms = await Room.find({});
    return res.status(200).json({
      status: true,
      message: "Get All Data Successfully!!",
      rooms,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error!!",
    });
  }
};

//edit a room by its roomId
export const editRoomById = async (req, res) => {
  const id = req.body.RoomId;
  try {
    let updatedRoom = await Room.findByIdAndUpdate(id, req.body);
    await updatedRoom.save();
    return res.status(200).json({
      status: true,
      message: "Rooms data Updated Successfully!!",
      updatedRoom,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error!!",
    });
  }
};

//getting room by id
export const getRoomById = async (req, res) => {
  const roomId = req.body.roomId;
  try {
    let roomDetails = await Room.findOne({ _id: roomId })
      .populate("review")
      .populate({
        path: "review",
        populate: {
          path: "userId",
          model: "User",
        },
      });
    return res.status(200).json({
      status: true,
      message: "Details get successfully!!",
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteRoomByid = async (req, res) => {
  try {
    const Id = req.body.RoomId;
    let updatedRooms = await Room.findByIdAndDelete(Id).exec();
    return res.status(200).json({
      status: true,
      message: "Room deleted successfully!!",
      updatedRooms,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error!!",
    });
  }
};

export const updateRoomByid = async (req, res) => {
  try {
    const id = req.params.id;
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
    const data = await Room.findById({ _id: id });
    const previmages = data.images;
    console.log(previmages);
    const updateData = {
      name,
      bedsize,
      capacity,
      services,
      description,
      price,
      images: [...previmages, ...results],
    };

    const updatedInfo = await Room.findByIdAndUpdate(id, updateData, {
      new: true, // to get the updated document as the result
    });
    console.log(updateData.images);

    return res.status(200).json({
      status: true,
      message: "Data updated successfully!",
      updateInfo: updatedInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error!",
    });
  }
};
