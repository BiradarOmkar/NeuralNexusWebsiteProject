import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API;

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_URL}/getevents-id/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-300 bg-gray-900 min-h-screen">
        Loading event...
      </div>
    );

  if (!event)
    return (
      <div className="text-center py-20 text-xl font-semibold text-red-400 bg-gray-900 min-h-screen">
        Event not found
      </div>
    );

  const eventDate = new Date(event.date);
  const registrationDeadline = event.registrationDeadline
    ? new Date(event.registrationDeadline)
    : null;

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-400 hover:text-blue-300 text-base font-medium flex items-center transition"
        >
          ← Back to Events
        </button>

        {/* Banner */}
        {event.bannerImage && (
          <div className="rounded-2xl overflow-hidden shadow-xl mb-10 border border-gray-700">
            <img
              src={event.bannerImage}
              alt="Event Banner"
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white mb-6 leading-tight border-b border-gray-700 pb-4">
          {event.title}
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-12 leading-relaxed">
          {event.description}
        </p>

        {/* Details Section */}
        <div className="grid sm:grid-cols-2 gap-8 bg-gray-800/60 p-8 rounded-2xl shadow-lg border border-gray-700">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Date & Time
            </p>
            <p className="text-lg font-semibold text-gray-100">
              {eventDate.toLocaleDateString()} at {event.time}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Venue
            </p>
            <p className="text-lg font-semibold text-gray-100">
              {event.isOnline ? "Online" : event.venue || "TBA"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Registration Required
            </p>
            <p className="text-lg font-semibold text-gray-100">
              {event.hasRegistration ? "Yes" : "No"}
            </p>
          </div>

          {event.hasRegistration && (
            <>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Registration Deadline
                </p>
                <p className="text-lg font-semibold text-gray-100">
                  {registrationDeadline?.toLocaleDateString() || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Max Participants
                </p>
                <p className="text-lg font-semibold text-gray-100">
                  {event.maxParticipants || "Unlimited"}
                </p>
              </div>
            </>
          )}

          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Certificate
            </p>
            <p className="text-lg font-semibold text-gray-100">
              {event.certificateAvailable ? "Available" : "Not Available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Organizer Contact
            </p>
            <p className="text-lg font-semibold text-gray-100">
              {event.organizerEmail || "Not specified"}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {event.tags?.length ? (
                event.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 border border-gray-600 text-gray-200 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">None</span>
              )}
            </div>
          </div>
        </div>

        {/* Register Button */}
        {event.hasRegistration && (
          <div className="mt-12 text-center">
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-10 py-3 rounded-2xl text-lg font-semibold shadow-lg transition transform hover:scale-105 border border-gray-700"
             onClick={() => navigate(`/events/register/${event._id}`)}
            >
              Register Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;
