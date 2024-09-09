import Order from "../models/Order.js"

//create order
export const createOrder = async(req, res, next) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)

    } catch (err) {
        next(err)
    }
}

//update order
export const updateOrder = async(req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedOrder)

    } catch (err) {
        next(err)
    }
}


//delete order
export const deleteOrder = async(req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")

    } catch (err) {
        next(err)
    }
}

//get a specific user orders
export const customerOrders = async(req, res, next) => {
    try {
        const orders = await Order.find({ customerId: req.params.customerId }).sort({ createdAt: -1 })
        res.status(200).json(orders)

    } catch (err) {
        next(err)
    }
}

//get all orders
export const getOrders = async(req, res, next) => {
    const query = req.query.new
    try {
        const orders = query
        ? await Order.find().sort({_id: -1}).limit(9)
        : await Order.find().sort({_id: -1})

        res.status(200).json(orders)
    } catch (err) {
        next(err)
    }
}

//get monthly income
export const Income = async(req, res, next) => {
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }, ...(productId && { products: { $elemMatch: { productId } } }) } },
            { $project: { month: { $month: "$createdAt" }, sales: "$amount" ,createdAt: 1} },
            { $group: { _id: "$month", total: { $sum: "$sales" } } },
        ])
        res.status(200).json(income)
    } catch (err) {
        next(err)
    }
}

export const salesStats = async(req, res, next) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const stats = await Order.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" },sales: "$amount" } },
            { $sort: { createdAt: -1 } },
            { $group: { _id: "$month", total: { $sum: "$sales" } } }
        ])
        res.status(200).json(stats)

    } catch (err) {
        next(err)
    }
}