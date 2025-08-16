import event from "../model/EventModel.js";

export const editEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;
    const updatedEvent = await event.findByIdAndUpdate(
      eventId,
      updatedData,
      { new: true } // return the updated document
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
    console.log("Event Successfully Updated");
  } catch (e) {
    res.status(500).json({ message: "Error While Editing Student Details" });
    console.log("Error in Editing Details", e);
  }
};
