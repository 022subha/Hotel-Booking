import mongoose, { Mongoose } from "mongoose";

const bookingSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roomId:{
        type:mongoose.Types.ObjectId,
        ref:"Room",
        required:true,
    },
    CheckIn:{
        type:Date,
        required:true,
    },
    CheckOut:{
        type:Date,
        required:true,
    },
    TotalCost:{
       type:Number,
       required:true,
    },
    PaymentStatus:{
        type:String,
        default:"pending",
        required:true,
    },
    BookingStatus:{
        type:String,
        default:"pending",
        required:true,
    },

})

export default mongoose.model("Booking",bookingSchema);