import express from "express"
import { countByType, createExpense, deleteExpense, expensesStats, getAllExpenses, getExpense } from "../controllers/expense.js"

const router = express.Router()

//create expense
router.post("/",createExpense)

//get expense 
router.get("/:id",getExpense)

//delete expense
router.delete("/:id",deleteExpense)

//get all expenses
router.get("/",getAllExpenses)

//count by
router.get("/find/countByType",countByType)

//expenses stats
router.get("/get/stats",expensesStats)






export default router