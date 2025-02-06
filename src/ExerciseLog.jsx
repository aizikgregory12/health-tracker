import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { startOfWeek, endOfWeek } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExerciseLog = () => {
  const [exercise, setExercise] = useState({
    name: "",
    duration: "",
    intensity: "",
    caloriesBurned: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [exercises, setExercises] = useState([]);
  const [weeklyGoal, setWeeklyGoal] = useState({ calories: 0, duration: 0 });
  const [goalInput, setGoalInput] = useState({ calories: "", duration: "" });
  const [error, setError] = useState("");

  // Fetch data from local storage
  useEffect(() => {
    const storedExercises = JSON.parse(localStorage.getItem("exercises")) || [];
    setExercises(storedExercises);

    const storedGoals = JSON.parse(localStorage.getItem("weeklyGoal")) || {
      calories: 0,
      duration: 0,
    };
    setWeeklyGoal(storedGoals);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExercise((prev) => ({ ...prev, [name]: value }));
  };

  const addExercise = () => {
    if (
      !exercise.name ||
      !exercise.duration ||
      !exercise.intensity ||
      !exercise.caloriesBurned ||
      !exercise.date
    ) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");

    const newExercise = {
      ...exercise,
      id: Date.now(),
      duration: parseInt(exercise.duration),
      caloriesBurned: parseInt(exercise.caloriesBurned),
    };
    const updatedExercises = [...exercises, newExercise];

    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    setExercises(updatedExercises);

    setExercise({
      name: "",
      duration: "",
      intensity: "",
      caloriesBurned: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const saveWeeklyGoal = () => {
    const newGoal = {
      calories: parseInt(goalInput.calories) || 0,
      duration: parseInt(goalInput.duration) || 0,
    };

    localStorage.setItem("weeklyGoal", JSON.stringify(newGoal));
    setWeeklyGoal(newGoal);
    setGoalInput({ calories: "", duration: "" });
  };

  const getWeeklyProgress = () => {
    const start = startOfWeek(new Date()).toISOString().slice(0, 10);
    const end = endOfWeek(new Date()).toISOString().slice(0, 10);

    return exercises.reduce(
      (acc, exercise) => {
        if (exercise.date >= start && exercise.date <= end) {
          acc.calories += exercise.caloriesBurned;
          acc.duration += exercise.duration;
        }
        return acc;
      },
      { calories: 0, duration: 0 }
    );
  };

  const weeklyProgress = getWeeklyProgress();

  const generateChartData = () => {
    const dates = [...new Set(exercises.map((ex) => ex.date))].sort();

    const caloriesData = dates.map((date) =>
      exercises
        .filter((ex) => ex.date === date)
        .reduce((sum, ex) => sum + ex.caloriesBurned, 0)
    );
    const durationData = dates.map((date) =>
      exercises
        .filter((ex) => ex.date === date)
        .reduce((sum, ex) => sum + ex.duration, 0)
    );

    return {
      labels: dates,
      datasets: [
        {
          label: "Calories Burned",
          data: caloriesData,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
          label: "Duration (minutes)",
          data: durationData,
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
        },
      ],
    };
  };

  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-100 min-h-screen p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl max-w-4xl p-6 space-y-8 md:space-y-0 md:space-x-6">
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600 text-center">
            Exercise Tracking
          </h2>
          {error && <p className="text-red-600 text-center">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Exercise Name"
            value={exercise.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={exercise.duration}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="intensity"
            placeholder="Intensity (e.g., Moderate)"
            value={exercise.intensity}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="caloriesBurned"
            placeholder="Calories Burned"
            value={exercise.caloriesBurned}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            name="date"
            value={exercise.date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addExercise}
            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Exercise
          </button>
        </div>

        <div className="md:w-1/3 min-w-[300px] space-y-4">
          <h3 className="text-lg font-semibold text-blue-500 text-center">
            Weekly Goals
          </h3>
          <input
            type="number"
            name="calories"
            placeholder="Set Weekly Calories Goal"
            value={goalInput.calories}
            onChange={(e) =>
              setGoalInput({ ...goalInput, calories: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="duration"
            placeholder="Set Weekly Duration Goal (minutes)"
            value={goalInput.duration}
            onChange={(e) =>
              setGoalInput({ ...goalInput, duration: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={saveWeeklyGoal}
            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Weekly Goal
          </button>

          <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
            <h4 className="text-center font-semibold text-blue-600 mb-4">
              Current Weekly Goals
            </h4>
            <p>Calories Goal: {weeklyGoal.calories}</p>
            <p>Duration Goal: {weeklyGoal.duration} mins</p>
            <p>Calories Burned: {weeklyProgress.calories}</p>
            <p>Duration: {weeklyProgress.duration} mins</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 mt-6">
        <h3 className="text-lg font-semibold text-blue-500 text-center mb-4">
          Exercise Trends
        </h3>
        <Line
          data={generateChartData()}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Exercise Trends" },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ExerciseLog;
