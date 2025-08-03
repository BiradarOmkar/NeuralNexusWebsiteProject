import express from 'express'
import event from '../model/EventModel.js';
export const addevent=async(req,res)=>{
   console.log("Admin Add Event Route");
   try{
       const {
        title,
        description,
        date,
        time,
        venue,
        isOnline,
        bannerImage,
        hasRegistration,
        registrationDeadline,
        maxParticipants,
        organizerEmail,
        certificateAvailable,
        tags
       }=req.body;
        //  check for missing Fields
        if(!title || !description ||!time ||!date){
            res.json("Missing Fields");
        }
    //    create new Document of Event
    const newEvent=new event({
         title,
      description,
      date,
      time,
      venue: isOnline ? "Online" : venue,
      isOnline,
      bannerImage,
      hasRegistration,
      registrationDeadline,
      maxParticipants,
      organizerEmail,
      certificateAvailable,
      tags,
    })
    //  Save to DB
    await newEvent.save();
     res.status(201).json({ message: "Event created successfully", event: newEvent });
   }catch(e){
       console.error("Error creating event:", e);
    res.status(500).json({ message: "Server error" });
   }      
};

