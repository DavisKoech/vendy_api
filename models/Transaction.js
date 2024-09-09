import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    transactionType:{type:String,required:true,default:"sales" },
    paidThrough:{type:String,required:true,default:"cash" },
    amount:{type:Number,required:true},

}, { timestamps: true })

export default mongoose.model("Transaction", TransactionSchema)