import React, { useState, useEffect } from "react";
import { startOfDay, endOfDay, format } from "date-fns";

const HydrationLog = () => {
  const [hydrationLogs, setHydrationLogs] = useState([]);
  const [hydrationInput, setHydrationInput] = useState("");
  const [dailyTotal, setDailyTotal] = useState(0);
  const [error, setError] = useState("");

  // Fetch hydration logs from local storage
  const fetchHydrationLogs = () => {
    const storedLogs = JSON.parse(localStorage.getItem("hydrationLogs")) || [];
    const today = new Date();
    const startDate = startOfDay(today).toISOString();
    const endDate = endOfDay(today).toISOString();

    const dailyLogs = storedLogs.filter(
      (log) => log.createdAt >= startDate && log.createdAt <= endDate
    );

    setHydrationLogs(dailyLogs);
    setDailyTotal(dailyLogs.reduce((sum, log) => sum + log.amount, 0));
  };

  useEffect(() => {
    fetchHydrationLogs();
  }, []);

  const handleAddHydration = () => {
    const amount = parseInt(hydrationInput, 10);
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");

    const newLog = {
      id: Date.now(),
      amount,
      createdAt: new Date().toISOString(),
    };
    const updatedLogs = [...hydrationLogs, newLog];
    localStorage.setItem("hydrationLogs", JSON.stringify(updatedLogs));

    setHydrationInput("");
    fetchHydrationLogs();
  };

  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-blue-600 text-center">
          Hydration Tracking
        </h2>
        <p className="text-center text-gray-700">
          Total Water Intake Today:{" "}
          <span className="font-bold">{dailyTotal} mL</span>
        </p>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="number"
          placeholder="Enter water intake (mL)"
          value={hydrationInput}
          onChange={(e) => setHydrationInput(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddHydration}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Log Hydration
        </button>

        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-semibold text-blue-500">Today's Logs</h3>
          {hydrationLogs.length === 0 ? (
            <p className="text-gray-600">No logs yet.</p>
          ) : (
            <ul className="space-y-2">
              {hydrationLogs.map((log) => (
                <li
                  key={log.id}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  {log.amount} mL - {format(new Date(log.createdAt), "h:mm a")}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HydrationLog;
