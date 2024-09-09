import express from "express"
const router = express.Router()
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../error.js"

//register
router.post("/register", async (req,res,next) => {
  
    try{
        //generating password
        const salt = await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        //creating user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            profilePicture:req.body.profilePicture,
            coverPicture:req.body.coverPicture,
            desc:req.body.desc,
            category:req.body.category,
            town:req.body.town
        })

        const user = await newUser.save()
        res.status(200).json(user)

    }catch(err){
        next(err)
    }
})

//login
router.post("/login", async (req,res,next) => {
    
    try{
        //find user in db
        const user = await User.findOne({email:req.body.email})
        if(!user)  return next(createError(404,"User not found"))

        //check password validity
        //const ispasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        //if(ispasswordCorrect) return next(createError(403, "Wrong password"))

        //login after correct credentials
        res.status(200).json(user)

    }catch(err){
        next(err)
    }
})







export default router