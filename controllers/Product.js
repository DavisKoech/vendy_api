import Product from "../models/Product.js"

//creating a product
export const createProduct = async (req,res,next) => {
    const newProduct = new Product({...req.body,business: req.body.business })

    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)

    }catch(err){
        next(err)
    }
}

//get products
export const getProducts = async (req,res,next) => {
    try{
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(200).json(products)

    }catch(err){
        next(err)
    }
}

//delete a product
export const deleteProduct = async (req,res,next) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product delelted")
    }catch(err){
        next(err)
    }
}