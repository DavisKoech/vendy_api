import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
    businessName:{type:String,required:true,unique:true},
    phoneNo:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    facebookAccount:{type:String},
    xAccount:{type:String},
    igAccount:{type:String},
    tiktokAccount:{type:String},
    whatsappNo:{type:String},
    website:{type:String},
    county:{type:String,required:true},
    constituency:{type:String,required:true},
    ward:{type:String,required:true},
    businessCenter:{type:String,required:true},
    category:{type:String,required:true},
    coverPhoto:{type:String},
    profilePhoto:{type:String}
})

export default mongoose.model("Business", BusinessSchema)