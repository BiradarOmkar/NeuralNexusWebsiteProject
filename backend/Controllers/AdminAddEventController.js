import express from "express";
import Event from "../model/EventModel.js";
import Subscribe from "../model/SubscribeModel.js";
import { sendEventMail } from "../utils/SendEventMail.js";

export const addevent = async (req, res) => {
  console.log("Admin Add Event Route");
  console.log("Event Details:", req.body);
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
      isPaid,
      amount,
      qrImage,
      organizerEmail,
      certificateAvailable,
      tags,
    } = req.body;

    // 1️⃣ Validate required fields
    if (!title || !description || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 2️⃣ Handle maxParticipants
    if (!maxParticipants || isNaN(Number(maxParticipants))) {
      maxParticipants = Infinity;
    } else {
      maxParticipants = Number(maxParticipants);
    }

    // 3️⃣ Ensure isPaid is boolean
    isPaid = isPaid === true || isPaid === "true";

    // 4️⃣ Create new Event document
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      venue: isOnline ? "Online" : venue,
      isOnline: isOnline || false,
      bannerImage: bannerImage || null,
      hasRegistration: hasRegistration !== undefined ? hasRegistration : true,
      registrationDeadline: registrationDeadline || null,
      maxParticipants,
      organizerEmail: organizerEmail || null,
      certificateAvailable: certificateAvailable || false,
      tags: tags || [],
      isPaid,
      amount: amount || 0,
      qrImage: qrImage || null,
    });

    // 5️⃣ Save Event to database
    await newEvent.save();
    console.log("New Event Saved:", newEvent);

    // 6️⃣ Fetch all subscribers
    const subscribers = await Subscribe.find().select("email -_id");
    const subscriberEmails = subscribers.map(sub => sub.email);

    // 7️⃣ Send emails asynchronously (don't block response)
    if (subscriberEmails.length > 0) {
      sendEventMail(
        subscriberEmails,
        newEvent.title,
        newEvent.description,
        newEvent.date,
        newEvent.time,
        newEvent.venue
      )
        .then(() => console.log("Emails sent successfully"))
        .catch(err => console.error("Error sending emails:", err));
    }

    // 8️⃣ Respond to frontend
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });

  } catch (e) {
    console.error("Error creating event:", e);
    res.status(500).json({ message: "Server error" });
  }
};
