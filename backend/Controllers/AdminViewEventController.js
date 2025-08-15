import event from "../model/EventModel.js";
import registration from "../model/UserRegistrationModel.js";

export const getEvents = async (req, res) => {
  try {
    const events = await event.find(); // Fetch all events
    
    // Add registeredCount to each event
    const eventsWithCount = await Promise.all(
      events.map(async (e) => {
        const count = await registration.countDocuments({ eventId: e._id });
        return {
          ...e.toObject(),
          registeredCount: count,
        };
      })
    );

    console.log("Successfully Retrieved Event Details with registeredCount");
    res.status(200).json(eventsWithCount);
  } catch (e) {
    console.log("Error In Getting Events Data", e);
    res.status(500).json({ message: "Error in retrieving Events Details" });
  }
};
