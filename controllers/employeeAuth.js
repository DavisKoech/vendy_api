import Employee from "../models/Employee.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"

//Employee Register
export const Register = async(req, res, next) => {
    try {
        //encrypting password during registration process
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        //initializing a new document in the employees collection
        const newEmployee = new Employee({
            ...req.body,
            password: hash
        })

        //saving the data in db
        const savedEmployee = await newEmployee.save()
        res.status(201).json(savedEmployee)

    } catch (err) {
        next(err)
    }
}

//employee login
export const Login = async(req, res, next) => {
    try {
        //finding employee in employees collection
        const employee = await Employee.findOne({ username: req.body.username })
        if (!employee) return next(createError(404, "employee not found"))

        //checking if password is correct
        const ispasswordCorrect = await bcrypt.compare(req.body.password, employee.password)
        if (!ispasswordCorrect) return next(createError(404, "wrong password"))

        //creating authentication token
        const token = jwt.sign({ id: employee._id, isAdmin: employee.isAdmin }, process.env.JWT)

        //using destructuring to get the employee object
        //using rest operator to group the remaining properties to the otherDetails object
        const { password, isAdmin,...otherDetails } = employee._doc

        //server response
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({ details: {...otherDetails }, isAdmin })

    } catch (err) {
        next(err)
    }
}

export const Logout = async (req, res) => {
    res.clearCookie("accessToken", {sameSite: "none",secure: true}).status(200).send("User has been logged out.");
  };