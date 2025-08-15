import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center justify-center px-6">
      {/* Club Name */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
        Neural Nexus
      </h1>

      {/* Subheading */}
      <p className="text-xl sm:text-2xl font-medium text-gray-300 mb-2 text-center">
        AIML Club of CBIT
      </p>

      {/* Tagline */}
      <p className="text-md sm:text-lg text-gray-400 text-center max-w-xl">
        Innovate. Learn. Collaborate with the brightest AI minds on campus.
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex gap-4">
        <a
          href="/events"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white font-medium transition"
        >
          Explore Events
        </a>
        <a
          href="/about"
          className="border border-gray-400 hover:border-white px-5 py-2 rounded text-white font-medium transition"
        >
          About the Club
        </a>
      </div>
    </div>
  );
}

export default Home;
