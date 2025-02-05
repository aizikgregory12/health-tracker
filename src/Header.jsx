import React, { useState, useRef, useEffect } from "react";

const Header = ({ selectedForm, setSelectedForm, signOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
        ref={menuRef}
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex lg:justify-center lg:space-x-6 lg:flex-grow absolute lg:static top-16 left-0 w-1/4 min-w-[160px] bg-white lg:bg-transparent shadow-lg lg:shadow-none p-4 lg:p-0 space-y-2 lg:space-y-0`}
      >
        <button
          onClick={() => setSelectedForm("meal")}
          aria-pressed={selectedForm === "meal"}
          className={`w-full lg:w-auto px-6 py-2 rounded-lg font-semibold transition duration-200 whitespace-nowrap flex justify-center ${
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
          className={`w-full lg:w-auto px-6 py-2 rounded-lg font-semibold transition duration-200 whitespace-nowrap flex justify-center ${
            selectedForm === "exercise"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Exercise Log
        </button>
        <button
          onClick={() => setSelectedForm("hydration")}
          aria-pressed={selectedForm === "hydration"}
          className={`w-full lg:w-auto px-6 py-2 rounded-lg font-semibold transition duration-200 whitespace-nowrap flex justify-center ${
            selectedForm === "hydration"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Hydration
        </button>
        <button
          onClick={signOut}
          className="w-full lg:hidden bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition whitespace-nowrap flex justify-center"
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
