import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerId:{type:String},
    products:[{
        productId:{type:String},
        quantity: {type:Number,default:1},
        productsTotal:{type:Number,required:true}
    }],
    amount:{type:Number,required:true},
    county:{type:String,required:true},
    constituency:{type:String,required:true},
    ward:{type:String,required:true},
    pickupLocation:{type:String,required:true},
    direction:{type:String},
    contactNo:{type:String,required:true},
    firstName:{type:String},
    lastName:{type:String},
    customerID:{type:String}
}, {timestamps:true})

export default mongoose.model("Order",OrderSchema)