import Expense from "../models/Expense.js"


//create new expense
export const createExpense = async(req, res, next) => {
    const newExpense = new Expense(req.body)

    try {
        const savedExpense = await newExpense.save()
        res.status(200).json(savedExpense)

    } catch (err) {
        next(err)
    }
}

//get expense 
export const getExpense = async(req, res, next) => {
    try {
        const expense = await Expense.findById(req.params.id)
        res.status(200).json(expense)

    } catch (err) {
        next(err)
    }
}

//delete an expense
export const deleteExpense = async (req,res,next) => {
    try{
        await Expense.findByIdAndDelete(req.params.id)

    }catch(err){
        next(err)
    }
}

//get all expenses
export const getAllExpenses = async(req, res, next) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 })
        res.status(200).json(expenses)

    } catch (err) {
        next(err)
    }
}

//count expenses by type
export const countByType = async(req, res, next) => {
    try {
        const rentCount = await Expense.countDocuments({ type: "rent" })
        const transportCount = await Expense.countDocuments({ type: "transport" })
        const salariesCount = await Expense.countDocuments({ type: "salary" })
        const debtCount = await Expense.countDocuments({ type: "debt" })

        res.status(200).json([
            { type: "rent", count: rentCount },
            { type: "transport", count: transportCount },
            { type: "salary", count: salariesCount },
            { type: "debt", count: debtCount }
        ])

    } catch (err) {
        next(err)
    }
}

//get expenses stats
export const expensesStats = async(req, res, next) => {
    const date = new Date()
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());

    try {
        const stats = await Expense.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            { $project: { month: { $month: "$createdAt" }, expenses: "$amount",createdAt: 1 } },
            { $sort: { createdAt: -1 } },
            { $group: { _id: "$month", total: { $sum: "$expenses" } } }
        ])
        res.status(200).json(stats)

    } catch (err) {
        next(err)
    }
}