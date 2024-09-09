import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name:{type:String},
    desc:{type:String},
    price:{type:Number},
    img:{type:String},
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' } ,

},{timestamps: true})

export default mongoose.model("Product",ProductSchema)