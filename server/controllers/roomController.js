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


//getting all rooms api
export const getAllRooms=async(req,res)=>{
  try{
    let rooms=await roomModel.find({});
    return res.status(200)
    .json({
      status:true,
      message:"Get All Data Successfully!!",
      rooms
    })
  }
  catch(error)
  {
    return res.status(500)
    .json({
      status:false,
      message:"Internal Server Error!!"
    })
  }
}


//edit a room by its roomId
export const editRoomById=async(req,res)=>{
  const id=req.body.RoomId;
  try{
     let updatedRoom=await roomModel.findByIdAndUpdate(id,
        req.body
     )
     await updatedRoom.save();
     return res.status(200)
     .json({
      status:true,
      message:"Rooms data Updated Successfully!!",
      updatedRoom
     })
  }
  catch(error)
  {
    return res.status(500)
    .json({
      status:false,
      message:"Internal Server Error!!"
    })
  }
}

//getting room by id
export const getRoomById=async(req,res)=>{
  const roomId=req.body.roomId;
  try{
     let roomDetails=await roomModel.findOne({_id,roomId});
     return res.status(200)
     .json({
      status:true,
      message:"Details get successfully!!",
      roomDetails
     })
  }
  catch(error)
  {
    console.log(error);
    return res.status(200)
    .json({
      status:false,
      message:"Internal Server Error"
    })
  }
}