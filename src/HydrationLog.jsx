import React, { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createHydrationLog } from "./graphql/mutations";
import { listHydrationLogs } from "./graphql/queries";
import { format } from "date-fns";

// Initialize AWS Amplify API Client
const client = generateClient();

const HydrationLog = ({ user }) => {
  const [hydrationLogs, setHydrationLogs] = useState([]);
  const [hydrationInput, setHydrationInput] = useState("");
  const [dailyTotal, setDailyTotal] = useState(0);
  const [error, setError] = useState("");

  // Fetch hydration logs from DynamoDB
  const fetchHydrationLogs = async () => {
    try {
      const response = await client.graphql(
        graphqlOperation(listHydrationLogs, {
          filter: { userId: { eq: user.username } },
        })
      );
      const logs = response.data.listHydrationLogs.items;
      setHydrationLogs(logs);

      // Calculate daily total
      const total = logs.reduce((sum, log) => sum + log.amount, 0);
      setDailyTotal(total);
    } catch (err) {
      console.error("Error fetching hydration logs:", err);
    }
  };

  useEffect(() => {
    fetchHydrationLogs();
  }, []);

  const handleAddHydration = async () => {
    if (!hydrationInput || isNaN(hydrationInput)) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");

    const newLog = {
      userId: user.username,
      amount: parseInt(hydrationInput, 10),
      createdAt: new Date().toISOString(),
    };

    try {
      await client.graphql(
        graphqlOperation(createHydrationLog, { input: newLog })
      );

      setHydrationInput("");
      fetchHydrationLogs(); // Refresh data
    } catch (err) {
      console.error("Error adding hydration log:", err);
    }
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
