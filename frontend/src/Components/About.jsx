import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaHandshake, FaRocket } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Neural Nexus
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We are the official AIML Club of CBIT, founded in{" "}
            <span className="text-blue-400 font-semibold">2023</span>, uniting
            students to innovate, collaborate, and shape the future of AI.
          </p>
        </motion.div>

        {/* Vision / Values / Mission */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaBullseye className="text-4xl mx-auto mb-3 text-blue-400" />
            <h3 className="text-xl font-semibold text-center mb-2">Vision</h3>
            <p className="text-gray-400 text-sm text-center">
              To be the premier hub where students transform AI knowledge into
              real-world impact.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaHandshake className="text-4xl mx-auto mb-3 text-green-400" />
            <h3 className="text-xl font-semibold text-center mb-2">Values</h3>
            <p className="text-gray-400 text-sm text-center">
              Collaboration, continuous learning, and ethical AI development.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaRocket className="text-4xl mx-auto mb-3 text-purple-400" />
            <h3 className="text-xl font-semibold text-center mb-2">Mission</h3>
            <p className="text-gray-400 text-sm text-center">
              Bridging theory with practice through innovation and teamwork.
            </p>
          </div>
        </motion.div>

        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            What We Do
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Workshops & Bootcamps",
                desc: "Hands-on sessions on AI/ML tools and technologies.",
                emoji: "📚",
              },
              {
                title: "Guest Lectures",
                desc: "Talks by industry leaders and academic experts.",
                emoji: "🎤",
              },
              {
                title: "Hackathons",
                desc: "Competitions to test problem-solving skills.",
                emoji: "💻",
              },
              {
                title: "Collaborative Projects",
                desc: "Real-world projects to strengthen portfolios.",
                emoji: "🤝",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{item.emoji}</span>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed">
            "Whether you're a beginner or an advanced enthusiast, Neural Nexus
            is your platform to explore, learn, and innovate."
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
