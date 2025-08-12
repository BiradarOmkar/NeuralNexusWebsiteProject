import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API;
const AdminEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    isOnline: false,
    bannerImage: '',
    hasRegistration: true,
    registrationDeadline: '',
    maxParticipants: '',
    organizerEmail: '',
    certificateAvailable: false,
    tags: [],
  });

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${API_URL}/getevents-id/${id}`);
      const event = res.data;

      setEventData({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event.time || '',
        venue: event.venue || '',
        isOnline: event.isOnline || false,
        bannerImage: event.bannerImage || '',
        hasRegistration: event.hasRegistration || false,
        registrationDeadline: event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().split('T')[0] : '',
        maxParticipants: event.maxParticipants || '',
        organizerEmail: event.organizerEmail || '',
        certificateAvailable: event.certificateAvailable || false,
        tags: Array.isArray(event.tags) ? event.tags.join(', ') : '',
      });
    } catch (err) {
      console.error('Failed to fetch event', err);
      alert('Failed to load event data');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEventData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setEventData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = {
        ...eventData,
        tags: eventData.tags.split(',').map((tag) => tag.trim()), // Convert back to array
      };
      await axios.put(`${API_URL}/editEvent/${id}`, updatedEvent);
      alert('Event updated successfully');
      navigate('/admindashboard/manage-events');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update event');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Title" name="title" value={eventData.title} onChange={handleChange} />
        <Textarea label="Description" name="description" value={eventData.description} onChange={handleChange} />
        <Input label="Date" name="date" type="date" value={eventData.date} onChange={handleChange} />
        <Input label="Time" name="time" value={eventData.time} onChange={handleChange} />
        <Input label="Venue" name="venue" value={eventData.venue} onChange={handleChange} />
        <Checkbox label="Is Online" name="isOnline" checked={eventData.isOnline} onChange={handleChange} />
        <Input label="Banner Image URL" name="bannerImage" value={eventData.bannerImage} onChange={handleChange} />
        <Checkbox label="Has Registration" name="hasRegistration" checked={eventData.hasRegistration} onChange={handleChange} />
        <Input label="Registration Deadline" name="registrationDeadline" type="date" value={eventData.registrationDeadline} onChange={handleChange} />
        <Input label="Max Participants" name="maxParticipants" value={eventData.maxParticipants} onChange={handleChange} />
        <Input label="Organizer Email" name="organizerEmail" type="email" value={eventData.organizerEmail} onChange={handleChange} />
        <Checkbox label="Certificate Available" name="certificateAvailable" checked={eventData.certificateAvailable} onChange={handleChange} />
        <Input label="Tags (comma separated)" name="tags" value={eventData.tags} onChange={handleChange} />

        <div className="flex justify-between mt-6">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Update Event
          </button>
          <button type="button" onClick={() => navigate('/admin/view-events')} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, name, type = 'text', value, onChange }) => (
  <div>
    <label className="block font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border p-2 rounded"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block font-semibold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full border p-2 rounded"
    />
  </div>
);

const Checkbox = ({ label, name, checked, onChange }) => (
  <div className="flex items-center gap-2">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    <label className="font-medium">{label}</label>
  </div>
);

export default AdminEditEvent;
