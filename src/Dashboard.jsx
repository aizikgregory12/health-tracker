import React, { useState } from "react";
import Header from "./Header";
import MealLog from "./MealLog";
import ExerciseLog from "./ExerciseLog";

const Dashboard = () => {
  // Define state without TypeScript types
  const [selectedForm, setSelectedForm] = useState("meal");
  const [mealsByDate, setMealsByDate] = useState({});
  const [exercisesByDate, setExercisesByDate] = useState({});

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header selectedForm={selectedForm} setSelectedForm={setSelectedForm} />
      <div className="w-full flex-grow flex justify-center items-center p-4">
        {selectedForm === "meal" && (
          <MealLog mealsByDate={mealsByDate} setMealsByDate={setMealsByDate} />
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
