import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiPlus, FiCalendar, FiUsers, FiDownload, FiAward } from 'react-icons/fi';

function AdminDashBoard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-10 tracking-wide">Neural Nexus</h1>
        <nav className="flex-1 space-y-6">
          <Link to="addevent" className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded transition">
            <FiPlus /> Add Event
          </Link>
          <Link to="manage-events" className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded transition">
            <FiCalendar /> Manage Events
          </Link>
          <Link to="registrations" className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded transition">
            <FiUsers /> Registrations
          </Link>
          <Link to="download" className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded transition">
            <FiDownload /> Download Data
          </Link>
          <Link to="certificates" className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded transition">
            <FiAward /> Certificates
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-600 mt-2">Select an option from the sidebar to get started.</p>
        </div>

        {/* Render nested routes */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashBoard;
