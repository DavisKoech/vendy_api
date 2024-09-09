import express from "express"
import { createOrder, customerOrders, deleteOrder, getOrders, Income, salesStats, updateOrder } from "../controllers/order.js"
const router = express.Router()

//create order
router.post("/",createOrder)

//update order
router.put("/:id",updateOrder)

//delete order
router.delete("/:id",deleteOrder)

//get a specific user's order
router.get("/find/:customerId",customerOrders)

//get all orders 
router.get("/",getOrders)

//get monthly income
router.get("/income",Income)

router.get("/stats",salesStats)


export default router