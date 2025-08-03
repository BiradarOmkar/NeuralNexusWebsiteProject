import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AdminAddEventRoute from './routes/AdminAddEventRoute.js'
import AdminDeleteEventRoute from './routes/AdminDeleteEventRoute.js';
dotenv.config();
const app=express();
// Handling Middleware
app.use(express.json());
app.use(cors());

// used for debugging
console.log(process.env.PORT);
console.log(process.env.MONGO_URL);


// call Routes
app.use("/api",AdminAddEventRoute);
app.use("/api",AdminDeleteEventRoute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MONGODB");
    app.listen(process.env.PORT,()=>{
    console.log(`server running on Port ${process.env.PORT}`);
   })
}).catch((e)=>{
    console.log("Failed To Connect to the Database");
    console.log("Error",e);
})

