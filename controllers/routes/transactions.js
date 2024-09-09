import express from 'express'
const router = express.Router()
import { Total, cashTotal, countByType, createTransaction, deleteTransaction, getTransaction, getTransactions, mpesaTotal } from '../controllers/transaction.js'


//creating a new transaction
router.post('/',createTransaction)

//deleting a transaction
router.delete("/:id",deleteTransaction)

//get a transaction
router.get("/:id",getTransaction)

//get all transactions
router.get("/",getTransactions)

//count transactions by type
router.get("/get/count",countByType)

//summation of all mpesa transactions
router.get("/get/mpesa",mpesaTotal)

//summation of all cash transactions
router.get("/get/cash",cashTotal)

//total of all transactions
router.get('/get/all',Total)




export default router