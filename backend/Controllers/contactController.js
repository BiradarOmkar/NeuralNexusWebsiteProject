import express from 'express'
import contact from '../model/ContactModel.js'

export const SaveQuery=async(req,res)=>{
   try{
       const {firstName,lastName,email,phone,message}=req.body;
       console.log(req.body);
       const newcontact=await contact({
        firstName,
        lastName,
        email,
        phone,
        message
       })
       await newcontact.save();
       console.log(newcontact);
        res
      .status(201)
      .json({ message: "Query Successfully Sent", contact: newcontact });
   }catch(e){
       res.status(404).json({message:"Error in Saving data"});
       console.log("Error",e);
   }
}
