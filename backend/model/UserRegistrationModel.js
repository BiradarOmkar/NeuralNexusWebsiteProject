// models/EventRegistration.js
import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  college: String,
  year: String,
  department:String,
  registeredAt: { type: Date, default: Date.now }
});

eventRegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

const EventRegistration = mongoose.model("EventRegistration", eventRegistrationSchema);
export default EventRegistration;
