import express from "express";
import event from "../model/EventModel.js";

export const addevent = async (req, res) => {
  console.log("Admin Add Event Route");

  try {
    const {
      title,
      description,
      date,
      time,
      venue = "",
      isOnline = false,
      bannerImage = "",
      hasRegistration = false,
      registrationDeadline = null,
      maxParticipants,
      organizerEmail = "",
      certificateAvailable = false,
      tags = [],
    } = req.body;

    // Check for required fields
    if (!title || !description || !time || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Set participants limit
    let Participants;
    if (
      maxParticipants === undefined ||
      maxParticipants === null ||
      maxParticipants === ""
    ) {
      Participants = Infinity;
    } else {
      Participants = Number(maxParticipants);
      if (isNaN(Participants) || Participants <= 0) {
        Participants = Infinity; // fallback if the value is not a valid positive number
      }
    }
    // console.log(Participants);

    // Create event document
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

    // Save to DB
    await newEvent.save();
    console.log(newEvent);

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (e) {
    console.error("Error creating event:", e);
    res.status(500).json({ message: "Server error" });
  }
};
