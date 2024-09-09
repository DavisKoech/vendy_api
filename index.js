import express from "express"
const app = express()
import mongoose from "mongoose"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
dotenv.config()

//routes
import usersRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"
import postsRoute from "./routes/posts.js"
import businessRoute from "./business routes/businessAuth.js"
import productsRoute from "./routes/products.js"
import ordersRoute from "./routes/orders.js"
import transactionsRoute from "./routes/transactions.js"
import customerAuthRoute from "./routes/customerAuth.js"
import employeeAuthRoute from "./routes/employeeAuth.js"
import customersRoute from "./routes/customers.js"
import employeesRoute from "./routes/employees.js"
import expensesRoute from "./routes/expenses.js"


//connecting to mongodb
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to mongoDB")

    }catch(error){
        throw error
    }
}


//middlewares
app.use(express.json())
app.use(cors({origin: ["https://vendy.co.ke","https://vendywebsite.netlify.app","http://localhost:5173","http://localhost:5174","https://vendyad.netlify.app"],credentials: true}));
app.use(helmet())
app.use(morgan("common"))


//endpoints for accessing the api
app.use("/api/users",usersRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postsRoute)
app.use("/api/businesses",businessRoute)
app.use("/api/products",productsRoute)
app.use("/api/orders", ordersRoute)
app.use("/api/expenses", expensesRoute)
app.use("/api/transactions", transactionsRoute)
app.use("/api/customersAuth", customerAuthRoute)
app.use("/api/employeesAuth", employeeAuthRoute)
app.use("/api/customers", customersRoute)
app.use("/api/employees", employeesRoute)


//error handling mniddleware
app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})


//configuring server
app.listen(8000,() => {
    connect()
    console.log("Backend server is running")
})