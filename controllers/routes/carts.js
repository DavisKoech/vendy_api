import express from "express"
import { createCart, deleteCart, getCarts, updateCart, userCart } from "../controllers/cart.js"
const router = express.Router()


//create cart
router.post("/",createCart)

//update cart
router.put("/:id",updateCart)

//delete cart
router.delete("/:id",deleteCart)

//get a specific user's cart
router.get("/find/:userId",userCart)

//get all carts
router.get("/",getCarts)




export default router