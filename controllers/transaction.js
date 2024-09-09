import Transaction from "../models/Transaction.js"

//creating a transaction
export const createTransaction = async(req, res, next) => {
    const newTrasaction = new Transaction(req.body)

    try {
        const savedTransaction = await newTrasaction.save()
        res.status(200).json(savedTransaction)

    } catch (err) {
        next(err)
    }
}

//get a transaction 
export const getTransaction = async(req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
        res.status(200).json(transaction)

    } catch (err) {
        next(err)
    }
}

//get all transactions
export const getTransactions = async(req, res, next) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 })
        res.status(200).json(transactions)

    } catch (err) {
        next(err)
    }
}

//deleting a transaction
export const deleteTransaction = async (req,res,next) => {
    try{

        await Transaction.findByIdAndDelete(req.params.id)

    }catch(err){
        next(err)
    }
}

//count transactions by type
export const countByType = async(req, res, next) => {
    try {
        const mpesaCount = await Transaction.countDocuments({ paidThrough: "mpesa" })
        const cashCount = await Transaction.countDocuments({ paidThrough: "cash" })

        res.status(200).json([
            { paidThrough: "mpesa", count: mpesaCount },
            { paidThrough: "cash", count: cashCount }
        ])

    } catch (err) {
        next(err)
    }
}

//calculating total of all transactions made through mpesa
export const mpesaTotal = async(req, res, next) => {

    //calculating the previous 2 months from now
    const date = new Date()
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());

    try {
        const mpesa = await Transaction.aggregate([
            { $match: { createdAt: { $gte: previousMonth }, paidThrough: "mpesa" } },
            { $project: { month: { $month: "$createdAt" }, transactions: "$amount" } },
            { $group: { _id: "$month", total: { $sum: "$transactions" } } }
        ])
        res.status(200).json(mpesa)

    } catch (err) {
        next(err)
    }

}

//calculating total of all transactions made through cash
export const cashTotal = async(req, res, next) => {

    //calculating the previous 2 months from now
    const date = new Date()
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());

    try {
        const cash = await Transaction.aggregate([
            { $match: { createdAt: { $gte: previousMonth }, paidThrough: "cash" } },
            { $project: { month: { $month: "$createdAt" }, transactions: "$amount" } },
            { $group: { _id: "$month", total: { $sum: "$transactions" } } }
        ])
        res.status(200).json(cash)

    } catch (err) {
        next(err)
    }

}

//calculating total of all transactions 
export const Total = async(req, res, next) => {

    //calculating the previous 2 months from now
    const date = new Date()
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());

    try {
        const total = await Transaction.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            { $project: { month: { $month: "$createdAt" }, transactions: "$amount" } },
            { $group: { _id: "$month", total: { $sum: "$transactions" } } }
        ])
        res.status(200).json(total)

    } catch (err) {
        next(err)
    }

}