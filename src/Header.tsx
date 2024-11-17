const Header = ({
  selectedForm,
  setSelectedForm,
}: {
  selectedForm: "meal" | "exercise";
  setSelectedForm: (form: "meal" | "exercise") => void;
}) => {
  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-center space-x-4">
      <button
        onClick={() => setSelectedForm("meal")}
        aria-pressed={selectedForm === "meal"}
        className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
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
        className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
          selectedForm === "exercise"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Exercise Log
      </button>
    </div>
  );
};

export default Header;
