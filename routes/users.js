import express from "express"
const router = express.Router()
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../error.js"

//update user
router.put("/:id", async (req,res,next) => {

    //incase the user tries to update password,this code will run
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)

            }catch(err){
              next(err)
            }
        }

        try{
            //if he/she or they and them tries to update a different aspect,this code will run
            const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(user)
        }catch(err){
           next(err)
        }


    }else{
        return next(createError(404, "You can only update your account"))
    }
})

//delete
router.delete("/:id", async (req,res,next) => {

    if(req.body.userId === req.params.id || req.user.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted")

        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        return next(createError(404, "You can only delete your account"))
    }
})

//get a user 
router.get("/",async (req,res,next) => {

    const userId = req.query.userId;
    const username = req.query.username;

    try{
        const user = userId ?
        await User.findById(userId) : await User.findOne({username:username})
        res.status(200).json(user)

    }catch(err){
        next(err)
    }
})

//follow a user
router.put("/:id/follow", async (req,res,next) => {

    //checking if the user who wants to follow is the same user as the user he/she wants to follow
    if(req.body.userId !== req.params.id){
        try{
            //finding both users from the database
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            //checking if the id of the current user is present in the followers array of the user he/she wants to follow
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                
                res.status(200).json("user has been followed")

            }else{
                return next(createError(403, "You allready follow this user"))
            }


        }catch(err){
            next(err)
        }

    }else{
        res.status(403).json("you cant follow yourself")
    }
})

//unfollow a user
router.put("/:id/unfollow", async (req,res,next) => {

    //checking if the user who wants to follow is the same user as the user he/she wants to follow
    if(req.body.userId !== req.params.id){
        try{
            //finding both users from the database
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            //checking if the id of the current user is present in the followers array of the user he/she wants to follow
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                
                res.status(200).json("user has been unfollowed")

            }else{
                return next(createError(403, "You dont follow this user"))
            }


        }catch(err){
            next(err)
        }

    }else{
        return next(createError(404, "You cant follow yourself"))
    }
})

//get friends
router.get("/friends/:userId",async (req,res,next) => {
    try{
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map(((friendId) => {
                return User.findById(friendId)
            }))
        )
        let friendList = []
        friends.map((friend) => {
            const {_id,username,profilePicture} = friend
            friendList.push({_id,username,profilePicture})
        })
        res.status(200).json(friendList)

    }catch(err){
        next(err)
    }
})

//get all users
router.get("/all",async (req,res,next) => {
    try{
        const users = await User.find()

        res.status(200).json(users)

    }catch(err){
        next(err)
    }
})



export default router