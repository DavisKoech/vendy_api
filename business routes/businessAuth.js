import express from "express"
import {BusinessRegister,BusinessLogin, getBusiness, getAllBusinesses, updateBusiness} from "../controllers/Business.js"
const router = express.Router()

//registration process
router.post("/register",BusinessRegister)

//login process
router.post("/login",BusinessLogin)

//fetching a single business
router.get("/:businessId",getBusiness)

//fetching all businesses
router.get("/",getAllBusinesses)

//updating a business
router.put("/:id",updateBusiness)






export default router