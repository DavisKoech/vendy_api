import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    category:{type:String},
    products:[{
        productId:{type:String},
        quantity: {type:Number,default:1},
        stockTotal:{type:Number,required:true}
    }],
}, {timestamps:true})

export default mongoose.model("Stock",StockSchema)