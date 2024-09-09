import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phoneNo:{type:String,required:true,unique:true},
    from:{type:String,default:"website"},
    img:{type:String,default:""},
},{timestamps:true})

export default mongoose.model("Customer",CustomerSchema)