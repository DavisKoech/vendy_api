import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
    productName:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true,default:1},
    amount:{type:Number,default:0},
}, {timestamps:true})

export default mongoose.model("Sale",SaleSchema)