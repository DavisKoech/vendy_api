import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,min:6},
    profilePicture:{type:String},
    coverPicture:{type:String},
    followers:{type:Array,default:[]},
    followings:{type:Array,default:[]},
    isAdmin:{type:Boolean,default:false},
    desc:{type:String},
    category:{type:String},
    town:{type:String},
},{timestamps:true})

export default mongoose.model("User", UserSchema)