import mongoose from "mongoose";

const EmployeesSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String},
    isAdmin:{type:Boolean,default:true}
},{timestamps:true})

export default mongoose.model("Employee",EmployeesSchema)