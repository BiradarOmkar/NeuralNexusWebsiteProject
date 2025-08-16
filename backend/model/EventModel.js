import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String },
  isOnline: { type: Boolean, default: false },
  bannerImage: { type: String },
  hasRegistration: { type: Boolean, default: true },
  registrationDeadline: { type: Date },
  maxParticipants: { type: Number,
      default: Number.MAX_SAFE_INTEGER
   },
  organizerEmail: { type: String }, 
  certificateAvailable: { type: Boolean, default: false }, 
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});


const event=mongoose.model('Event',eventSchema);
export default event;
