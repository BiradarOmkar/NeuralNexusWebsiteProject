import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5002/api";
const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [data, setData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/getevents`);
      const now = new Date();

      const upcoming = [];
      const past = [];
      console.log(res);

      res.data.forEach((event) => {
        const eventDate = new Date(event.date);
        if (eventDate > now) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      });

      setUpcomingEvents(upcoming);
      setPastEvents(past);
      setData(true);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const renderEventCard = (event, isUpcoming) => {
    const eventDate = new Date(event.date);
    const now = new Date();

    // FIXED: use registeredCount instead of participants?.length
    const isRegistrationOpen =
      eventDate >= now &&
      (!event.maxParticipants || event.registeredCount < event.maxParticipants);
    return (
      <div
        key={event._id}
        className="bg-white border border-gray-200 rounded-xl shadow p-6 w-full md:w-[48%] flex flex-col justify-between hover:shadow-lg transition duration-200"
      >
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {event.title}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            <strong>Date:</strong> {eventDate.toLocaleDateString()} |{" "}
            {eventDate.toLocaleTimeString()}
          </p>
        </div>

        <div className="mt-auto flex gap-4">
          <button
            onClick={() => navigate(`/events/${event._id}`)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            View Details
          </button>

          {isUpcoming && isRegistrationOpen && (
            <button
              onClick={() => navigate(`/events/register/${event._id}`)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition"
            >
              Register
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Upcoming Events */}
      {data ? (
        <div>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Upcoming Events
            </h2>
            {upcomingEvents.length > 0 ? (
              <div className="flex flex-wrap justify-between gap-6">
                {upcomingEvents.map((event) => renderEventCard(event, true))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No upcoming events.</p>
            )}
          </section>

          {/* Past Events */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Past Events
            </h2>
            {pastEvents.length > 0 ? (
              <div className="flex flex-wrap justify-between gap-6">
                {pastEvents.map((event) => renderEventCard(event, false))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No past events yet.</p>
            )}
          </section>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <AiOutlineLoading3Quarters className="size-6 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Events;
