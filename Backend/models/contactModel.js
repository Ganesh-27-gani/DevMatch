import mongoose from "mongoose";

const cantact = new mongoose.Schema({
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    messge:{
        type:String,
    }
})
export default mongoose.model("Contact", cantact)