import express from "express";
import event from "../model/EventModel.js";
import subscribe from "../model/SubscribeModel.js";
import { sendEventMail } from "../utils/SendEventMail.js";
export const addevent = async (req, res) => {
  console.log("Admin Add Event Route");
  try {
    let {
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
      tags,
    } = req.body;
    //  Fetch all Subscribers of NN
    let cursor = await subscribe.find();
    let FetchSubscribers = [];
    for await (const doc of cursor) {
      FetchSubscribers.push(doc.email);
    }
    console.log(FetchSubscribers);
    //  check for missing Fields
    let Participants;
    if (!title || !description || !time || !date) {
      res.json("Missing Fields");
    }
    if (
      maxParticipants === null ||
      maxParticipants == undefined ||
      maxParticipants === ""
    ) {
      maxParticipants = Infinity;
    } else {
      maxParticipants = Number(maxParticipants);
      if (isNaN(maxParticipants)) {
        maxParticipants = Infinity;
      }
    }
    //    create new Document of Event
    const newEvent = new event({
      title,
      description,
      date,
      time,
      venue: isOnline ? "Online" : venue,
      isOnline,
      bannerImage,
      hasRegistration,
      registrationDeadline,
      maxParticipants: Participants,
      organizerEmail,
      certificateAvailable,
      tags,
    });
    console.log(newEvent);
    //  Save to DB
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
    await sendEventMail(FetchSubscribers,newEvent.title,newEvent.description,newEvent.date,newEvent.time,newEvent.venue);
     res.status(201).json({message:"Successfully Sent Mail To Subscribers"});
  } catch (e) {
    console.error("Error creating event:", e);
    res.status(500).json({ message: "Server error" });
  }
};
