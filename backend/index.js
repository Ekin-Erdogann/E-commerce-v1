import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();// this will allow us to use the environment variables in the .env file
const app = express();// this will create an express app 
const port=process.env.PORT || 3000; // this will get the port from the environment variables or use 3000 if it is not set
const __dirname = path.resolve();// this will get the current directory name
// express is a function that returns an object with methods that we can use to create a server  
app.use(express.json()); //a middleware that allows us to accept json data in the body

app.use("/api/products",productRoutes);// this will use the productRoutes

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
 }       
app.listen(port,()=>{
    connectDB();// this will connect to the database
    console.log("server started at http://Localhost:"+port);
    
});