import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API;

const UserRegistrationForm = () => {
  const { id: eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    department: "",
    paymentId: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_URL}/getevents-id/${eventId}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await axios.post(`${API_URL}/userregister`, { ...formData, eventId });
      setSuccessMessage("✅ You have successfully registered for the event!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        department: "",
        paymentId: "",
      });
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage("⚠️ You have already registered with this email.");
      } else {
        setErrorMessage("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-gray-900 shadow-xl rounded-2xl border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Event Registration
      </h2>

      {event && (
        <div className="mb-6 p-5 border rounded-lg bg-gray-800 text-center shadow-md">
          <h3 className="text-2xl font-bold text-white">{event.title}</h3>
          <p className="text-gray-300 mb-2">{event.description}</p>
          <p className="text-gray-400 mb-2">
            {new Date(event.date).toLocaleDateString()} | {event.time}
          </p>
          {event.isPaid && (
            <p className="text-gray-200 font-medium mb-2">
              💰 Registration Fee:{" "}
              <span className="text-green-400">₹{event.amount}</span>
            </p>
          )}
          {event.qrImage && (
            <div className="flex justify-center mt-4">
              <img
                src={event.qrImage}
                alt="QR Code"
                className="w-36 h-36 object-contain border border-gray-600 rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      )}

      {successMessage && (
        <p className="text-green-400 text-center mb-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-400 text-center mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="college"
          >
            College
          </label>
          <input
            type="text"
            name="college"
            id="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="department"
          >
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="year"
          >
            Year
          </label>
          <select
            name="year"
            id="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Other">Other</option>
          </select>
        </div>
      { event?.amount !=0 &&
        (<div>
         <label
            className="block text-gray-300 font-medium mb-1"
            htmlFor="paymentId"
          >
            Payment Id
          </label>
          <input
            type="text"
            name="paymentId"
            id="paymentId"
            value={formData.paymentId}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>)
        }
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
