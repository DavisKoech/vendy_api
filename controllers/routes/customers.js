import express from "express"
const router = express.Router()
import { customerStats, customersCount, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controllers/customer.js"




//update customer
router.put("/:id",updateCustomer)

//delete customer
router.delete("/:id",deleteCustomer)

//get customer
router.get("/:id",getCustomer)

//get all customers
router.get("/",getCustomers)

//customer stats
router.get('/count/stats',customerStats)

//customers count
router.get('/count/all',customersCount)






export default router