import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();// this will allow us to use the environment variables in the .env file
const app = express();// this will create an express app 
// express is a function that returns an object with methods that we can use to create a server  
app.use(express.json()); //a middleware that allows us to accept json data in the body

app.use("/api/products",productRoutes);// this will use the productRoutes
app.listen(3000,()=>{
    connectDB();// this will connect to the database
    console.log("server started at http://Localhost:3000");
    
});