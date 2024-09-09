import Business from "../models/Business.js"
import bcrypt from 'bcrypt'
import {createError} from "../error.js"

//Store register
export const BusinessRegister = async (req,res,next) => {
    try{
        //encrypting password during registration process
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        //initializing a new document i the business collection
        const newBusiness = new Business({
            ...req.body,
            password:hash
        })

        //saving the data into db
        const savedBusiness = await newBusiness.save()
        res.status(201).json(savedBusiness)

    }catch(err){
        next(err)
    }
}

//store login
export const BusinessLogin = async (req,res,next) => {
    try{
        //finding business in  businesses collection
        const business = await Business.findOne({businessName:req.body.businessName})
        if(!business) return next(createError(404,"Business not found"))

        //checking if password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password,business.password)
        if(!isPasswordCorrect) return next(createError(404,"wrong business name or password"))

        //destructuring not to send pasword to client
        const {password,...otherDetails} = business._doc
        res.status(200).json({details:{...otherDetails }})

    }catch (err) {
        next(err)
    }
}

//updating business
export const updateBusiness = async(req, res, next) => {
    try {
        const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedBusiness)
    } catch (err) {
        next(err)
    }
}

//get a single business
export const getBusiness  = async (req,res,next) => {
    try{

        const business = await Business.findById(req.params.businessId)
        res.status(200).json(business)
   
    }catch(err){
        next(err)
    }
}

//get all businesses
export const getAllBusinesses = async (req,res,next) => {
    try{
        const businesses = await Business.find()
        res.status(200).json(businesses) 
    }catch(err){
        next(err)
    }
}

