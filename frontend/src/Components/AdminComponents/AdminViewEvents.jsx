import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API;
const AdminViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/getevents`);
      const data = res.data;
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.error("Expected an array but got:", data);
        setEvents([]);
      }
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${API_URL}/deleteEvent/${id}`);
      alert("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete event");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admindashboard/edit-event/${id}`);
  };

  const toggleMoreDetails = (id) => {
    setExpandedEventId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="border rounded-xl p-4 shadow bg-white space-y-2"
            >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-700 line-clamp-3">{event.description}</p>

              <div className="text-sm text-gray-600 space-y-1">
                <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>⏰ Time: {event.time || "Not Provided"}</p>
                <p>📍 Venue: {event.venue || "Not specified"}</p>
                <p>💻 Mode: {event.isOnline ? "Online" : "Offline"}</p>
              </div>

              {expandedEventId === event._id && (
                <div className="mt-2 p-2 border rounded bg-gray-50 text-sm space-y-1">
                  {event.bannerImage && (
                    <img
                      src={event.bannerImage}
                      alt="Event Banner"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  {event.registrationDeadline && (
                    <p>📅 Registration Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</p>
                  )}
                  {event.maxParticipants && (
                    <p>👥 Max Participants: {event.maxParticipants}</p>
                  )}
                  {event.organizerEmail && (
                    <p>📧 Organizer Email: {event.organizerEmail}</p>
                  )}
                  <p>🎓 Certificate: {event.certificateAvailable ? "Available" : "Not Available"}</p>
                  {event.tags && event.tags.length > 0 && (
                    <p>🏷️ Tags: {event.tags.join(", ")}</p>
                  )}
                  <p>📝 Registration: {event.hasRegistration ? "Enabled" : "Disabled"}</p>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <button
                  className="text-blue-600 underline"
                  onClick={() => toggleMoreDetails(event._id)}
                >
                  {expandedEventId === event._id ? "Hide Details" : "More Details"}
                </button>
                <div className="space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(event._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() =>{
                      navigate(`/admindashboard/view-registrations/${event._id}`)
                      
                    }
                    }
                  >
                    View Registrations
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminViewEvents;
