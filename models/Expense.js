import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    type: {type:String,default:"rent" },
    amount: {type: Number},
    paidThrough:{type: String,default:"cash" }
}, { timestamps:true})

export default mongoose.model("Expense",ExpenseSchema)