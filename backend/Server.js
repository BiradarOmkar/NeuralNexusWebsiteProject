import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AdminAddEventRoute from './routes/AdminAddEventRoute.js'
import AdminDeleteEventRoute from './routes/AdminDeleteEventRoute.js';
import AdminViewEventRoute from './routes/AdminViewEventRoute.js';
import AdminEditEventRoute from './routes/AdminEditEventRoute.js'
import AdminViewSingleEvent from './routes/AdminViewSingleEvent.js';
import userRegistrationRoute from './routes/UserRegistrationRoute.js';
import getEventRegistrationsRoute from './routes/getEventRegistrationsRoute.js'
import AdminDeleteRegistrationRoute from './routes/AdminDeleteRegistrationRoute.js';
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
app.use("/api",AdminViewEventRoute);
app.use("/api",AdminEditEventRoute);
app.use("/api",AdminViewSingleEvent);
app.use("/api",userRegistrationRoute);
app.use("/api",getEventRegistrationsRoute);
app.use("/api",AdminDeleteRegistrationRoute);

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

