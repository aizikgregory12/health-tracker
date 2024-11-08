import React, { useState, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { v4 as uuidv4 } from "uuid";
import { Line } from "react-chartjs-2";
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
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
} from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExerciseLog = ({ exercisesByDate, setExercisesByDate }) => {
  const [exercise, setExercise] = useState({
    name: "",
    duration: "",
    intensity: "",
    caloriesBurned: "",
    date: new Date().toISOString().slice(0, 10),
    time: "08:00",
  });
  const [error, setError] = useState("");
  const [goal, setGoal] = useState({ weeklyCalories: 0, weeklyDuration: 0 });
  const [progress, setProgress] = useState({
    totalCalories: 0,
    totalDuration: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({ ...prevExercise, [name]: value }));
  };

  const addExercise = useCallback(() => {
    if (
      !exercise.name ||
      !exercise.duration ||
      !exercise.intensity ||
      !exercise.caloriesBurned ||
      !exercise.date ||
      !exercise.time
    ) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");

    const exerciseDate = new Date(exercise.date).toISOString().slice(0, 10);
    const newExerciseEntry = { ...exercise, date: exerciseDate, id: uuidv4() };

    setExercisesByDate((prevExercisesByDate) => {
      const updatedExercises = { ...prevExercisesByDate };
      if (!updatedExercises[exerciseDate]) {
        updatedExercises[exerciseDate] = [];
      }
      updatedExercises[exerciseDate] = [
        ...updatedExercises[exerciseDate],
        newExerciseEntry,
      ];
      return updatedExercises;
    });

    setExercise({
      name: "",
      duration: "",
      intensity: "",
      caloriesBurned: "",
      date: new Date().toISOString().slice(0, 10),
      time: "08:00",
    });
  }, [exercise, setExercisesByDate]);

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };

  const calculateProgress = () => {
    let totalCalories = 0;
    let totalDuration = 0;

    for (const date in exercisesByDate) {
      exercisesByDate[date].forEach((exercise) => {
        totalCalories += parseInt(exercise.caloriesBurned, 10);
        totalDuration += parseInt(exercise.duration, 10);
      });
    }

    setProgress({ totalCalories, totalDuration });
  };

  const generateChartData = () => {
    const dates = Object.keys(exercisesByDate).sort();
    const caloriesData = dates.map((date) =>
      exercisesByDate[date].reduce(
        (sum, exercise) => sum + parseInt(exercise.caloriesBurned, 10),
        0
      )
    );
    const durationData = dates.map((date) =>
      exercisesByDate[date].reduce(
        (sum, exercise) => sum + parseInt(exercise.duration, 10),
        0
      )
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
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Exercise Tracking
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Exercise Name"
            autoComplete="off"
            value={exercise.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            autoComplete="off"
            value={exercise.duration}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="intensity"
            placeholder="Intensity (e.g., Moderate)"
            autoComplete="off"
            value={exercise.intensity}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="caloriesBurned"
            placeholder="Calories Burned"
            autoComplete="off"
            value={exercise.caloriesBurned}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            name="date"
            autoComplete="off"
            value={exercise.date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="time"
            name="time"
            autoComplete="off"
            value={exercise.time}
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
            Set Exercise Goals
          </h3>
          <input
            type="number"
            name="weeklyCalories"
            placeholder="Weekly Calories Burned"
            autoComplete="off"
            value={goal.weeklyCalories}
            onChange={handleGoalChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="weeklyDuration"
            placeholder="Weekly Duration (minutes)"
            autoComplete="off"
            value={goal.weeklyDuration}
            onChange={handleGoalChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={calculateProgress}
            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Calculate Progress
          </button>
          <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
            <h4 className="text-center font-semibold text-blue-600 mb-4">
              Progress
            </h4>
            <p>
              Total Calories Burned: {progress.totalCalories} /{" "}
              {goal.weeklyCalories}
            </p>
            <p>
              Total Duration: {progress.totalDuration} mins /{" "}
              {goal.weeklyDuration} mins
            </p>
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
