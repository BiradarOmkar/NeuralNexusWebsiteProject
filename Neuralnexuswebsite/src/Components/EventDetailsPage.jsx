import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/getevents-id/${id}`);
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
    return <div className="text-center py-16 text-lg font-medium text-gray-600">Loading event...</div>;
  if (!event)
    return <div className="text-center py-16 text-lg font-medium text-red-500">Event not found</div>;

  const eventDate = new Date(event.date);
  const registrationDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline text-sm flex items-center"
      >
        ← Back to Events
      </button>

      {/* Banner */}
      {event.bannerImage && (
        <img
          src={event.bannerImage}
          alt="Event Banner"
          className="w-full h-64 sm:h-80 object-cover rounded-xl mb-8 shadow-md"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-8 leading-relaxed">{event.description}</p>

      {/* Details */}
      <div className="grid sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl shadow">
        <div>
          <p className="text-sm text-gray-500">Date & Time</p>
          <p className="text-lg font-medium text-gray-800">
            {eventDate.toLocaleDateString()} at {event.time}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Venue</p>
          <p className="text-lg font-medium text-gray-800">
            {event.isOnline ? 'Online' : event.venue || 'TBA'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Registration Required</p>
          <p className="text-lg font-medium text-gray-800">
            {event.hasRegistration ? 'Yes' : 'No'}
          </p>
        </div>

        {event.hasRegistration && (
          <>
            <div>
              <p className="text-sm text-gray-500">Registration Deadline</p>
              <p className="text-lg font-medium text-gray-800">
                {registrationDeadline?.toLocaleDateString() || 'Not specified'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Max Participants</p>
              <p className="text-lg font-medium text-gray-800">
                {event.maxParticipants || 'Unlimited'}
              </p>
            </div>
          </>
        )}

        <div>
          <p className="text-sm text-gray-500">Certificate</p>
          <p className="text-lg font-medium text-gray-800">
            {event.certificateAvailable ? 'Available' : 'Not Available'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Organizer Contact</p>
          <p className="text-lg font-medium text-gray-800">
            {event.organizerEmail || 'Not specified'}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-sm text-gray-500">Tags</p>
          <p className="text-lg font-medium text-gray-800">
            {event.tags?.join(", ") || 'None'}
          </p>
        </div>
      </div>

      {/* Register Button */}
      {event.hasRegistration && (
        <div className="mt-10 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
          //  onClick={handleclick}
          >
            Register Now
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
