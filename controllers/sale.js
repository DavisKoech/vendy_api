import Sale from "../models/Sale.js"


//create new sale
export const createSale = async(req, res, next) => {
    const newSale= new Sale(req.body)

    try {
        const savedSale = await newSale.save()
        res.status(200).json(savedSale)

    } catch (err) {
        next(err)
    }
}

//get single sale record
export const getSale = async(req, res, next) => {
    try {
        const sale = await Sale.findById(req.params.id)
        res.status(200).json(sale)

    } catch (err) {
        next(err)
    }
}

//delete single sale record
export const deleteSale = async (req,res,next) => {
    try{
        await Sale.findByIdAndDelete(req.params.id)
        res.status(200).json("Record deleted")
    }catch(err){
        next(err)
    }
}

//get all sale records
export const getAllSales = async(req, res, next) => {
    try {
        const sales = await Sale.find().sort({ createdAt: -1 })
        res.status(200).json(sales)

    } catch (err) {
        next(err)
    }
}



