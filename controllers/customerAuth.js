import Customer from "../models/Customer.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js"



//registering a customer
export const Register = async(req, res, next) => {
    try {
          // Check if the username already exists
          const existingCustomer = await Customer.findOne({ username: req.body.username });

          if (existingCustomer) {
            return res.status(409).json({ message: "Username already exists." });
          }
        //encrypting password during the registration process
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        //initializing a new document in the customers collection
        const newCustomer = new Customer({
            ...req.body,
            password: hash
        })

        //saving the data in the db
        const savedCustomer = await newCustomer.save()
        res.status(200).json(savedCustomer)
    } catch (err) {
        next(err)
    }
}

//customer login
export const Login = async(req, res, next) => {
    try {
        //finding customer in collection
        const customer = await Customer.findOne({ username: req.body.username })
        if (!customer) return next(createError(404, "Customer not found"))

        //checking if password is correct
        const ispasswordCorrect = await bcrypt.compare(req.body.password, customer.password)
        if (!ispasswordCorrect) return next(createError(404, "Wrong password"))

        

        //using destructuring to get the password out of the customer object
        //using rest operator to group the remaining properties to the otherDetails object
        const { password, ...otherDetails } = customer._doc

        //server response data
        res.status(200).json({details:{...otherDetails }})

    } catch (err) {
        next(err)
    }
}