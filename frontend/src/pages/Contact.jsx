import React from "react";
import { LiaUniversitySolid } from "react-icons/lia";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
        {/* Left Side */}
        <div className="flex-1 p-8 bg-gray-50">
          <h2 className="text-3xl font-bold mb-4 text-black">Get in touch</h2>
          <p className="text-gray-600 mb-8">
            Need to get touch with us? Either fill out the form or contact us
          </p>

          <div className="space-y-4 text-gray-800">
            <div className="flex items-center gap-3">
              <LiaUniversitySolid className="size-5 text-gray-400" />
              <div>
                <p>CBIT</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IoCallOutline className="size-5 text-gray-400" />
              <p>+91 789-234-5678</p>
            </div>
            <div className="flex items-center gap-3">
              <CiMail className="size-5 text-gray-400" />
              <p>neuralnexus@yourcollege.edu</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 p-8 bg-white">
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
            ></textarea>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
