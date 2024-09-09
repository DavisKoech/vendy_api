import Customer from "../models/Customer.js"


//updating customer
export const updateCustomer = async(req, res, next) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedCustomer)
    } catch (err) {
        next(err)
    }
}

//get customer
export const getCustomer = async(req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id)
        res.status(200).json(customer)

    } catch (err) {
        next(err)
    }
}

//get all customers
export const getCustomers = async(req, res, next) => {
    const query = req.query.new
    try {
        const customers = query
        ? await Customer.find().sort({_id: -1}).limit(7)
        : await Customer.find()
        res.status(200).json(customers)

    } catch (err) {
        next(err)
    }
}

//delete customer
export const deleteCustomer = async(req, res, next) => {
    try {
        await Customer.findByIdAndDelete(req.params.id)
        res.status(200).json("customer has been deleted")

    } catch (err) {
        next(err)
    }
}


//get customer stats
export const customerStats = async(req, res, next) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const stats = await Customer.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            { $sort: { createdAt: -1 } },
            { $group: { _id: "$month", total: { $sum: 1 } } }
        ])
        res.status(200).json(stats)

    } catch (err) {
        next(err)
    }
}

//customers count
export const customersCount = async(req, res, next) => {
    try {
        const all = await Customer.countDocuments()
        res.status(200).json(all)

    } catch (err) {
        next(err)
    }
}