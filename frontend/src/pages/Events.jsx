import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const API_URL = import.meta.env.VITE_API;

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

    const isRegistrationOpen =
      eventDate >= now &&
      (!event.maxParticipants || event.registeredCount < event.maxParticipants);

    return (
      <div
        key={event._id}
        className="bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col w-full md:w-[48%]"
      >
        {/* Banner */}
        {event.bannerImage && (
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-52 object-cover"
          />
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow text-white">
          <div className="flex justify-between items-start">
            <h3 className="text-xl sm:text-2xl font-bold">{event.title}</h3>
            {isUpcoming && (
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow animate-pulse">
                Live
              </span>
            )}
          </div>

          <p className="text-gray-300 mt-2 mb-3 line-clamp-2">
            {event.description}
          </p>

          <p className="text-sm text-gray-400 mb-6">
            <span className="font-semibold">📅 Date:</span>{" "}
            {eventDate.toLocaleDateString()} | {eventDate.toLocaleTimeString()}
          </p>

          <div className="mt-auto flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/events/${event._id}`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
            >
              View Details
            </button>

            {isUpcoming && isRegistrationOpen && (
              <button
                onClick={() => navigate(`/events/register/${event._id}`)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black text-white py-20 text-center shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          🚀 Explore Our Events
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-gray-300">
          Stay updated with upcoming events, workshops, and sessions. Relive our
          past moments of learning and collaboration.
        </p>
        <a
          href="#upcoming"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow-md transition"
        >
          See Upcoming Events
        </a>
      </section>

      {/* Events Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {data ? (
          <>
            {/* Upcoming */}
            <section id="upcoming" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-10 text-center border-b border-gray-700 pb-3">
                🌟 Upcoming Events
              </h2>
              {upcomingEvents.length > 0 ? (
                <div className="flex flex-wrap justify-between gap-6">
                  {upcomingEvents.map((event) => renderEventCard(event, true))}
                </div>
              ) : (
                <p className="text-center text-gray-500 italic">
                  No upcoming events.
                </p>
              )}
            </section>
            {/* Past */}
            <section className="bg-gray-900/40 backdrop-blur-md py-12 px-6 rounded-2xl border border-gray-700 shadow-inner">
              <h2 className="text-3xl font-bold text-white mb-10 text-center border-b border-gray-700 pb-3">
                📖 Past Events
              </h2>
              {pastEvents.length > 0 ? (
                <div className="flex flex-wrap justify-between gap-6">
                  {pastEvents.map((event) => renderEventCard(event, false))}
                </div>
              ) : (
                <p className="text-center text-gray-500 italic">
                  No past events yet.
                </p>
              )}
            </section>
          </>
        ) : (
          <div className="flex justify-center items-center h-40">
            <AiOutlineLoading3Quarters className="size-10 animate-spin text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
