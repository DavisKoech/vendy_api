import express from "express"
import { AliveProducts, MeatProducts, createProduct, deleteProduct,  getAllProducts,  getProduct, updateProduct } from "../controllers/product.js"
const router = express.Router()


//create product route
router.post("/",createProduct)

//get all products
router.get("/",getAllProducts)

//update product route
router.put("/:id",updateProduct)

//delete product route
router.delete("/:id",deleteProduct)

//get product route
router.get("/:id",getProduct)

//get meat products
router.get("/meat/all", MeatProducts)

//get alive products
router.get("/alive/all",AliveProducts)










export default router