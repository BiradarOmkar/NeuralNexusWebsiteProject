import React from "react";
import { Link } from "react-router-dom";
import { FiMenu,FiX } from "react-icons/fi";
import { useState } from "react";
function Navbar() {
  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];
  const [open, setopen] = useState(false);
  return (
    <header className="bg-gray-900 text-white px-6 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl  text-white font-bold">Neural Nexus</h1>
        {/* Desktop */}
        <nav>
          <ul className=" hidden md:flex space-x-6">
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  to={page.path}
                  className="text-white font-medium transition duration-200 p-2 px-4 hover:bg-blue-600 hover:rounded-2xl"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* hambergur icon */}
        <div className="md:hidden">
          <FiMenu
            className="text-3xl text-gray-700 cursor-pointer"
            onClick={() => {
              setopen(!open);
            }}
          ></FiMenu>
        </div>
        {/* mobile view */}
        <div
          className={`fixed top-0 right-0 h-full w-64 text-white  bg-gray-900 hadow-lg transform ${
            open ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 md:hidden`}
        >
        {/* close icon */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <FiX className="text-2xl cursor-pointer" onClick={() => setopen(!open)} />
        </div>
          <nav className="bg-gray-900 flex flex-col p-4 space-y-4">
            {pages.map((page, index) => (
              <Link
                key={index}
                to={page.path}
                onClick={() => setopen(false)} // close when clicked
                className="text-lg font-medium p-2 m-2 text-center hover:bg-blue-600 hover:rounded-2xl"
              >
                {page.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
        {open && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setopen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
