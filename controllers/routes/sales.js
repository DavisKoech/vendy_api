import express from "express"
import { createSale, deleteSale, getAllSales, getSale } from "../controllers/sale.js"

const router = express.Router()

//create sale
router.post("/",createSale)

//get all sale records
router.get("/",getAllSales)

//get a sale record 
router.get("/:id",getSale)

//delete sale record
router.delete("/:id",deleteSale)










export default router