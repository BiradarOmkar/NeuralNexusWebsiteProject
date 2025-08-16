import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaRobot } from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center px-6 py-10">
      {/* Club Name */}
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Neural Nexus
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-xl sm:text-2xl font-medium text-gray-300 mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        AIML Club of CBIT
      </motion.p>

      {/* Tagline */}
      <motion.p
        className="text-md sm:text-lg text-gray-400 text-center max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Innovate. Learn. Collaborate with the brightest AI minds on campus.
      </motion.p>

      {/* Feature Highlights */}
      <motion.div
        className="grid sm:grid-cols-3 gap-6 text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <FaUsers className="text-4xl mx-auto mb-3 text-blue-400" />
          <h3 className="text-lg font-semibold">Community</h3>
          <p className="text-gray-400 text-sm">
            Join a network of AI enthusiasts and grow together.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <FaCalendarAlt className="text-4xl mx-auto mb-3 text-green-400" />
          <h3 className="text-lg font-semibold">Events</h3>
          <p className="text-gray-400 text-sm">
            Hackathons, workshops, and competitions throughout the year.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <FaRobot className="text-4xl mx-auto mb-3 text-purple-400" />
          <h3 className="text-lg font-semibold">Innovation</h3>
          <p className="text-gray-400 text-sm">
            Work on cutting-edge projects in AI & Machine Learning.
          </p>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="/events"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition transform hover:scale-105"
        >
          Explore Events
        </a>
        <a
          href="/about"
          className="border border-gray-400 hover:border-white px-6 py-3 rounded-xl text-gray-200 font-semibold transition transform hover:scale-105"
        >
          About the Club
        </a>
      </motion.div>
    </div>
  );
}

export default Home;

