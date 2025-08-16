import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/admin.route.js'
import userRegistrationRoute from './routes/UserRegistrationRoute.js';
import getEventRegistrationsRoute from './routes/getEventRegistrationsRoute.js'
import contactRoute from './routes/contactRoute.js'
import userSubscribeRoute from './routes/UserSubscribeRoute.js'
dotenv.config();

const app=express();
// Handling Middleware
app.use(express.json());
app.use(cors());

// used for debugging
console.log(process.env.PORT);
console.log(process.env.MONGO_URL);


// call Routes
app.use("/api",adminRoutes);
app.use("/api",userRegistrationRoute);
app.use("/api",getEventRegistrationsRoute);
app.use("/api",userSubscribeRoute);
app.use("/api",contactRoute);


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

