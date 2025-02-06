import React, { useState } from "react";
import Header from "./Header";
import MealLog from "./MealLog";
import ExerciseLog from "./ExerciseLog";
import HydrationLog from "./HydrationLog";

const Dashboard = ({ user, signOut }) => {
  const [selectedForm, setSelectedForm] = useState("meal");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
        signOut={signOut}
      />

      <div className="w-full flex-grow flex justify-center items-center p-4">
        {selectedForm === "meal" && <MealLog user={user} />}
        {selectedForm === "exercise" && <ExerciseLog user={user} />}
        {selectedForm === "hydration" && <HydrationLog user={user} />}
      </div>
    </div>
  );
};

export default Dashboard;
