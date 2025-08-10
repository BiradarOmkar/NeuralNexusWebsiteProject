import EventRegistration from "../model/UserRegistrationModel.js";

export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await EventRegistration.find({eventId});

    return res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations", error);
    res.status(500).json({ message: "Error fetching registrations" });
  }
};
