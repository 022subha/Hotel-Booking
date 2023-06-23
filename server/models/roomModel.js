import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Size:{
        type:String,
        required:true,
    },
    Capacity:{
        type:Number,
        required:true,
    },
    Bedsize:{
        type:String,
        required:true,
    },
    Services:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Location:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    },
    Images:{
        type:[{String}],
    }


})

export default mongoose.model("rooms",roomSchema);