import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API;
function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    isOnline: false,
    bannerImage: "",
    hasRegistration: true,
    registrationDeadline: "",
    maxParticipants: "",
    isPaid: false,
    amount: 0,
    qrImage: null,
    organizerEmail: "",
    certificateAvailable: false,
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // handle Qr
const handleQrupload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "NeuralNexusUploads");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dgiomhyja/image/upload",
      formData
    );
    return res.data.secure_url;
  } catch (e) {
    console.error("Cloudinary upload error:", e.response?.data || e.message);
    alert("Failed to upload QR image.");
    return null;
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("API=", API_URL);
  //  handle qr uploads
  let qrUrl=formData.qrImage;
  if(formData.isPaid && formData.qrImage){
    qrUrl=await handleQrupload(formData.qrImage);
  }
  
    const dataToSend = {
      ...formData,
      qrImage:qrUrl,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await fetch(`${API_URL}/addevent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      console.log("Event Created", result);
      alert("Event Succcessfully Created");
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        isOnline: false,
        bannerImage: "",
        hasRegistration: true,
        registrationDeadline: "",
        maxParticipants: "",
        isPaid: false,
        amount: 0,
        qrImage: null,
        organizerEmail: "",
        certificateAvailable: false,
        tags: "",
      });
    } catch (e) {
      console.error("Error adding event:", e);
      alert("Something went wrong. Please try again.");
    }

    console.log("Submitting form:", dataToSend);
    // Send to backend using fetch/axios
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="w-full border px-3 py-2 rounded"
          required
          value={formData.title}
          onChange={handleChange}
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full border px-3 py-2 rounded"
          required
          value={formData.description}
          onChange={handleChange}
        />

        {/* Date & Time */}
        <div className="flex gap-4">
          <input
            type="date"
            name="date"
            className="w-1/2 border px-3 py-2 rounded"
            required
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            className="w-1/2 border px-3 py-2 rounded"
            required
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        {/* Is Online */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isOnline"
            checked={formData.isOnline}
            onChange={handleChange}
          />
          <label>Is this an online event?</label>
        </div>

        {/* Venue (optional if online) */}
        {!formData.isOnline && (
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            className="w-full border px-3 py-2 rounded"
            value={formData.venue}
            onChange={handleChange}
          />
        )}

        {/* Banner Image URL */}
        <input
          type="text"
          name="bannerImage"
          placeholder="Banner Image URL"
          className="w-full border px-3 py-2 rounded"
          value={formData.bannerImage}
          onChange={handleChange}
        />

        {/* Has Registration */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasRegistration"
            checked={formData.hasRegistration}
            onChange={handleChange}
          />
          <label>Does this event have registration?</label>
        </div>

        {/* Registration Info */}
        {formData.hasRegistration && (
          <>
            <input
              type="date"
              name="registrationDeadline"
              className="w-full border px-3 py-2 rounded"
              placeholder="Registration Deadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxParticipants"
              placeholder="Max Participants"
              className="w-full border px-3 py-2 rounded"
              value={formData.maxParticipants}
              onChange={handleChange}
            />
          </>
        )}
        {/* is Paid */}
        <div className="">
          <input
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={handleChange}
            className="border px-3 py-2 m-2 rounded"
            placeholder="Registration Amount"
          />
          <label>Is it Paid Event ?</label>
        </div>
        {formData.isPaid && (
          <>
            <input
              type="Number"
              name="amount"
              onChange={handleChange}
              value={formData.amount}
              placeholder="Enter Registration Amount"
              className="w-full border px-3 py-2 rounded"
            />
            {/* Qr Image */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Upload QR Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    setFormData({ ...formData, qrImage: file });
                  } else {
                    setFormData({ ...formData, qrImage: null });
                  }
                }}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>
          </>
        )}
        {/* Organizer Email */}
        <input
          type="email"
          name="organizerEmail"
          placeholder="Organizer Email"
          className="w-full border px-3 py-2 rounded"
          value={formData.organizerEmail}
          onChange={handleChange}
        />

        {/* Certificate Option */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="certificateAvailable"
            checked={formData.certificateAvailable}
            onChange={handleChange}
          />
          <label>Provide certificate for this event?</label>
        </div>

        {/* Tags */}
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          className="w-full border px-3 py-2 rounded"
          value={formData.tags}
          onChange={handleChange}
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
