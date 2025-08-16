import express from "express";
import subscribe from "../model/SubscribeModel.js";
import { sendSubscribeMail } from "../utils/SendSubscribeMail.js";
export const userSubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const alreadySubscribed = await subscribe.findOne({ email });
    if (alreadySubscribed) {
      return res.status(409).json({ message: "You have already subscribed" });
    }

    const newSubscribe = new subscribe({
      email,
      date: new Date(), // ensure your schema uses 'date'
    });

    await newSubscribe.save();
   await sendSubscribeMail(newSubscribe.email);
    console.log("Subscribed email:", email);
    return res.status(201).json({
      message: "Successfully Subscribed",
      subscribe: newSubscribe,
    });

  } catch (e) {
    console.error("Error while subscribing:", e);
    return res.status(500).json({ message: "Server error" });
  }
};
