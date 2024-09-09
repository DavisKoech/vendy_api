import Employee from "../models/Employee.js"
import bcrypt from 'bcrypt'


//updating employee
export const updateEmployee = async(req, res, next) => {
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
    }
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedEmployee)

    } catch (err) {
        next(err)
    }
}

//delete employee
export const deleteEmployee = async(req, res, next) => {
    try {
        await Employee.findByIdAndDelete(req.params.id)
        res.status(200).json("employee deleted")

    } catch (err) {
        next(err)
    }
}

//get employee
export const getEmployee = async(req, res, next) => {
    try {

        const employee = await Employee.findById(req.params.id)
        res.status(200).json(employee)

    } catch (err) {
        next(err)
    }
}

//get all employees
export const getEmployees = async(req, res, next) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees)

    } catch (err) {
        next(err)
    }
}

//count employees based on gender 
export const genderCount = async(req, res, next) => {
    try {
        const maleCount = await Employee.countDocuments({ gender: "male" })
        const femaleCount = await Employee.countDocuments({ gender: "female" })

        res.status(200).json([
            { gender: "male", count: maleCount },
            { gender: "female", count: femaleCount }
        ])

    } catch (err) {
        next(err)
    }
}

//counting all employees
export const allEmployees = async(req, res, next) => {
    try {
        const all_employees = await Employee.countDocuments()
        res.status(200).json(all_employees)

    } catch (err) {
        next(err)
    }
}