import event from "../model/EventModel.js";
import EventRegistration from "../model/UserRegistrationModel.js";
import { sendThankYouEmail } from "../utils/SendEmail.js";
export const UserRegister=async(req,res)=>{
     console.log("UserRegister endpoint hit");
  console.log("Request body:", req.body);
  try{
   const {
        eventId,
        fullName,
        email,
        phone,
        college,
        year,
        department,
        paymentId,
     }=req.body;
   

     if(!fullName || !email || !phone || !college ||!year||!department||!paymentId){
        return res.status(404).json({message:"All Fields are required"});
     }
    //  check if event Exist or not
     
     const selectedEvent=await event.findById(eventId);
     console.log(selectedEvent);
     
     if(!selectedEvent){
        return res.status(404).json({ message: "Event not found" });
     }
    //  Check for Limit 
    if(selectedEvent.maxParticipants==null) selectedEvent.maxParticipants=Infinity;
    const registrationCount = await EventRegistration.countDocuments({ eventId });
      console.log({
      selectedEvent
});
    if (registrationCount >= selectedEvent.maxParticipants) {
      return res.status(400).json({ message: "Participant limit reached" });
    }
    const alreadyRegistered=await EventRegistration.findOne({eventId,email});
    if(alreadyRegistered){
        return res.status(409).json({message:"you have already registered for this event"});
    }
    // create new registration
    const newRegistration=new EventRegistration({
        eventId,
        fullName,
        email,
        phone,
        college,
        year,
        department,
        paymentId
    })
    await newRegistration.save();
     await sendThankYouEmail(newRegistration.email, newRegistration.fullName, selectedEvent.title);
    return res.status(200).json({message:"Successfully Registered For the Event"});

  }catch(e){
     console.log("Error",e);
     return res.status(404).json({message:"Registration failed"});
  } 
}