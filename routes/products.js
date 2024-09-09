import express from "express"
import { createProduct, deleteProduct, getProducts } from "../controllers/Product.js"

const router = express.Router()

//create product
router.post("/",createProduct)

//get products
router.get("/",getProducts)

//delete product
router.delete("/:id",deleteProduct)






export default router