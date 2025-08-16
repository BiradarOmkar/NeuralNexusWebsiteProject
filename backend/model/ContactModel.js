import express from 'express';
import mongoose from 'mongoose'

const contactSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    message:{type:String,required:true}
})

const contact=mongoose.model("Contact",contactSchema);
export default contact;