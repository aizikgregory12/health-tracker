import React, { useState, useCallback } from "react";
import Header from "./Header";
import MealLog from "./MealLog";
import ExerciseLog from "./ExerciseLog";
import { generateClient } from "aws-amplify/api";
import { listMealLogs } from "./graphql/queries";

const client = generateClient();

const Dashboard = ({ user, signOut }) => {
  const [selectedForm, setSelectedForm] = useState("meal");
  const [mealsByDate, setMealsByDate] = useState([]);
  const [exercisesByDate, setExercisesByDate] = useState({});

  const fetchListMealLogs = useCallback(
    async (date) => {
      try {
        const mealLogs = await client.graphql({
          query: listMealLogs,
          variables: {
            filter: {
              date: {
                eq: date,
              },
            },
          },
        });
        const items = mealLogs.data.listMealLogs.items;

        setMealsByDate((prev) => [...items]);
      } catch (error) {
        console.error("Error fetching meal logs:", error);
      }
    },
    [setMealsByDate]
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
        user={user}
        signOut={signOut}
      />

      <div className="w-full flex-grow flex justify-center items-center p-4">
        {selectedForm === "meal" && (
          <MealLog
            mealsByDate={mealsByDate}
            user={user}
            fetchListMealLogs={fetchListMealLogs}
          />
        )}
        {selectedForm === "exercise" && (
          <ExerciseLog
            exercisesByDate={exercisesByDate}
            setExercisesByDate={setExercisesByDate}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
