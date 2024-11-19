import React, { useState } from "react";

const Header = ({ selectedForm, setSelectedForm, signOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden p-2 rounded-md hover:bg-gray-200"
        aria-label="Toggle Menu"
      >
        <svg
          className="h-6 w-6 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex lg:justify-center lg:space-x-6 lg:flex-grow absolute lg:static top-16 left-0 w-1/4 bg-white lg:bg-transparent shadow-lg lg:shadow-none p-4 lg:p-0 space-y-2 lg:space-y-0`}
      >
        <button
          onClick={() => setSelectedForm("meal")}
          aria-pressed={selectedForm === "meal"}
          className={`block w-full lg:w-auto px-6 py-2 rounded-lg font-semibold transition duration-200 ${
            selectedForm === "meal"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Meal Log
        </button>
        <button
          onClick={() => setSelectedForm("exercise")}
          aria-pressed={selectedForm === "exercise"}
          className={`block w-full lg:w-auto px-6 py-2 rounded-lg font-semibold transition duration-200 ${
            selectedForm === "exercise"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Exercise Log
        </button>
        <button
          onClick={signOut}
          className="block w-full lg:hidden bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
      <button
        onClick={signOut}
        className="hidden lg:block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition ml-auto"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;