import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Club Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Neural Nexus</h2>
          <p className="text-sm text-gray-400">
            AI/ML Club of Chaitanya Bharathi Institute Of Technology. Empowering innovation through learning, coding, and collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <ul className="text-sm text-gray-400 space-y-1">
            <li><a href="/home" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/events" className="hover:text-white">Events</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/admin" className="hover:text-white">Admin</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-sm text-gray-400">Email: neuralnexus@yourcollege.edu</p>
          <div className="flex mt-3 space-x-4">
            <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-white"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-white"><FaGithub size={20} /></a>
          </div>
        </div>

        {/* Newsletter (Optional) */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Subscribe</h2>
          <p className="text-sm text-gray-400 mb-2">Get updates on events & workshops.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-2 py-1 w-full rounded-l bg-gray-800 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 px-3 py-1 rounded-r text-white hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © 2025 Neural Nexus. All rights reserved. Built by the Neural Nexus team.
      </div>
    </footer>
  );
}

export default Footer;
