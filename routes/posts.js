import express from "express"
const router = express.Router()
import Post from "../models/Post.js"
import Business from "../models/Business.js"

//create a post
router.post("/",async (req,res,next) => {
   const  newPost = new Post(req.body)

   try{

    const savedPost = await newPost.save()
    res.status(200).json(savedPost)

   }catch(err){
    next(err)
   }
})

//update post 
router.put("/:id",async (req,res,next) => {
    try{
        //find post 
        const post = await Post.findById(req.params.id)

        //check if the user who wants to update the post is the real owner
        if(post.businessId === req.body.businessId){

            await post.updateOne({$set:req.body},{new:true})
            res.status(200).json("Post has been updated")

        }else{
            res.status(403).json("You can only update your own post")
        }

    }catch(err){
        next(err)
    }
})

//delete post 
router.delete("/:id",async (req,res,next) => {
    try{
        //find post 
        const post = await Post.findById(req.params.id)

        //check if the user who wants to update the post is the real owner
        if(post.businessId === req.body.businessId){

            await post.deleteOne()
            res.status(200).json("Post has been deleted")

        }else{
            res.status(403).json("You can only delete your own post")
        }

    }catch(err){
        next
    }
})

//like/dislike a post
router.put("/:id/like", async (req,res,next) => {

    try{
        //find a post
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.businessId)){
            await post.updateOne({$push:{likes:req.body.businessId}})
            
            res.status(200).json("The post has been liked")

        }else{
            await post.updateOne({$pull:{likes:req.body.businessId}})
            res.status(200).json("The post has been disliked")
        }

    }catch(err){
        next(err)
    }
})

 

//get timeline posts
router.get("/timeline/:businessId", async (req,res,next) => {

    try{
        //finding the business followers
        const currentBusiness = await Business.findById(req.params.userId)

        //finding current business posts
        const currentBusinessPosts = await Post.find({businessId:currentBusiness._id})
        const currentBusinessFollowingsPosts = await Promise.all(
            currentBusiness.followings.map((eachFollowingId) => {
               return  Post.find({businessId:eachFollowingId})
            })
        )

        res.status(200).json(currentBusinessPosts.concat(...currentBusinessFollowingsPosts))

    }catch(err){
       next(err)
    }
})

//get a single business posts
router.get("/profile/:businessId", async (req,res,next) => {

    try{
        //finding the current business
        const business = await Business.findOne({businessId:req.params.businessId})

        //finding business posts
        const posts = await Post.find({businessId:business._id})
       
        res.status(200).json(posts)
    }catch(err){
        next(err)
    }
})

//get all posts
router.get("/",async (req,res,next) => {
    try{
        const posts = await Post.find()

        res.status(200).json(posts)

    }catch(err){
        next(err)
    }
})


export default router