import express from "express"
import { allEmployees, deleteEmployee, genderCount, getEmployee, getEmployees, updateEmployee } from "../controllers/employee.js"
const router = express.Router()

//updating employee
router.put("/:id",updateEmployee)

//deleting employee
router.delete("/:id",deleteEmployee)

//get employee
router.get("/:id",getEmployee)

//get all employees
router.get("/",getEmployees)

//count employees by gender
router.get('/count/gender',genderCount)

//counting all employees
router.get("/count/all",allEmployees)





export default router