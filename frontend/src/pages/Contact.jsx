import React from "react";
import { LiaUniversitySolid } from "react-icons/lia";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API;
function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handlesubmit
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("User Data", formData);
      const response = await fetch(`${API_URL}/contact`,{
        method:"POST",
        headers:{
           "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
      });

      const res=response.json();
      console.log("Successfully Message Sent",res);
      alert("Message Successfully Sent");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
       console.error("Error In Sending Message:", error);
         alert("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-700 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-6 text-purple-400">
            Get in Touch
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Have questions, feedback, or ideas? We’d love to hear from you. Drop
            us a message or connect directly.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <LiaUniversitySolid className="w-6 h-6 text-purple-400" />
              <p className="text-gray-200">CBIT Campus</p>
            </div>
            <div className="flex items-center gap-4">
              <IoCallOutline className="w-6 h-6 text-purple-400" />
              <p className="text-gray-200">+91 789-234-5678</p>
            </div>
            <div className="flex items-center gap-4">
              <CiMail className="w-6 h-6 text-purple-400" />
              <p className="text-gray-200">neuralnexus@yourcollege.edu</p>
            </div>
          </div>
        </div>
        {/* Right Section - Form */}
        <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 p-10">
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              value={formData.phone}
              onChange={handleChange}
            />
            <textarea
              placeholder="Message"
              rows="4"
              name="message"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
              onClick={handlesubmit}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
