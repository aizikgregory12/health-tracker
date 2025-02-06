import React, { useState } from "react";
import Header from "./Header";
import MealLog from "./MealLog";
import ExerciseLog from "./ExerciseLog";
import HydrationLog from "./HydrationLog";

const Dashboard = () => {
  const [selectedForm, setSelectedForm] = useState("meal");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header selectedForm={selectedForm} setSelectedForm={setSelectedForm} />

      <div className="w-full flex-grow flex justify-center items-center p-4">
        {selectedForm === "meal" && <MealLog />}
        {selectedForm === "exercise" && <ExerciseLog />}
        {selectedForm === "hydration" && <HydrationLog />}
      </div>
    </div>
  );
};

export default Dashboard;
