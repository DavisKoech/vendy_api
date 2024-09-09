import mongoose from "mongoose";

const NormalUser = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    phoneNo:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePhoto:{}
})

export default mongoose.model("Business", NormalUser)