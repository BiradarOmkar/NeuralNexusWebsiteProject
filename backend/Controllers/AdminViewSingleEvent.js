// Get a single event by ID
import event from "../model/EventModel.js";
export const geteventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const singleEvent = await event.findById(eventId);
    if (!singleEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(singleEvent);
  } catch (e) {
    console.error("Error fetching single event:", e.message);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

