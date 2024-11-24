import React, { useState, useCallback, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { generateClient } from "aws-amplify/api";
import {
  createExerciseLog,
  createWeeklyGoal,
  updateWeeklyGoal,
} from "./graphql/mutations";
import { listExerciseLogs, listWeeklyGoals } from "./graphql/queries";
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

const client = generateClient();

const ExerciseLog = ({ user }) => {
  const [exercise, setExercise] = useState({
    name: "",
    duration: "",
    intensity: "",
    caloriesBurned: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const fetchWeeklyStats = async () => {
    try {
      const startOfWeekDate = startOfWeek(new Date())
        .toISOString()
        .slice(0, 10);
      const endOfWeekDate = endOfWeek(new Date()).toISOString().slice(0, 10);

      const response = await client.graphql({
        query: listExerciseLogs,
        variables: {
          filter: {
            userId: { eq: user.username },
            date: { between: [startOfWeekDate, endOfWeekDate] },
          },
        },
      });

      const items = response.data.listExerciseLogs.items;

      const totalCalories = items.reduce(
        (sum, exercise) => sum + parseInt(exercise.caloriesBurned || 0, 10),
        0
      );
      const totalDuration = items.reduce(
        (sum, exercise) => sum + parseInt(exercise.duration || 0, 10),
        0
      );

      console.log("Total Calories Burned:", totalCalories);
      console.log("Total Duration Worked Out:", totalDuration);

      setProgress({
        totalCalories,
        totalDuration,
      });
    } catch (error) {
      console.error("Error fetching weekly stats:", error);
    }
  };

  const [progress, setProgress] = useState({
    totalCalories: 0,
    totalDuration: 0,
  });
  const [exercisesByDate, setExercisesByDate] = useState({});
  const [weeklyGoal, setWeeklyGoal] = useState(null);
  const [goalInput, setGoalInput] = useState({
    weeklyCaloriesGoal: "",
    weeklyDurationGoal: "",
  });
  const [error, setError] = useState("");

  const fetchExerciseLogs = useCallback(async () => {
    try {
      const exerciseLogs = await client.graphql({
        query: listExerciseLogs,
        variables: {
          filter: { userId: { eq: user.username } },
        },
      });

      const items = exerciseLogs.data.listExerciseLogs.items;

      const groupedByDate = items.reduce((acc, exercise) => {
        const date = exercise.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(exercise);
        return acc;
      }, {});

      setExercisesByDate(groupedByDate);
    } catch (error) {
      console.error("Error fetching exercise logs:", error);
    }
  }, [user.username]);

  const fetchWeeklyGoal = useCallback(async () => {
    try {
      const startOfWeekDate = startOfWeek(new Date())
        .toISOString()
        .slice(0, 10);

      const response = await client.graphql({
        query: listWeeklyGoals,
        variables: {
          filter: {
            userId: { eq: user.username },
            startOfWeek: { eq: startOfWeekDate },
          },
        },
      });

      const goals = response.data.listWeeklyGoals.items;

      if (goals.length > 0) {
        setWeeklyGoal(goals[0]);
      } else {
        setWeeklyGoal(null);
      }
    } catch (error) {
      console.error("Error fetching weekly goals:", error);
    }
  }, [user.username]);

  const saveWeeklyGoal = async () => {
    try {
      const startOfWeekDate = startOfWeek(new Date())
        .toISOString()
        .slice(0, 10);
      const endOfWeekDate = endOfWeek(new Date()).toISOString().slice(0, 10);

      const inputGoal = {
        userId: user.username,
        startOfWeek: startOfWeekDate,
        endOfWeek: endOfWeekDate,
        weeklyCaloriesGoal: parseInt(goalInput.weeklyCaloriesGoal, 10) || 0,
        weeklyDurationGoal: parseInt(goalInput.weeklyDurationGoal, 10) || 0,
        caloriesBurned: weeklyGoal?.caloriesBurned || 0,
        duration: weeklyGoal?.duration || 0,
      };

      if (weeklyGoal && weeklyGoal.id) {
        const updatedGoal = { id: weeklyGoal.id, ...inputGoal };
        const result = await client.graphql({
          query: updateWeeklyGoal,
          variables: { input: updatedGoal },
        });
        setWeeklyGoal(result.data.updateWeeklyGoal);
      } else {
        const result = await client.graphql({
          query: createWeeklyGoal,
          variables: { input: inputGoal },
        });
        setWeeklyGoal(result.data.createWeeklyGoal);
      }

      setGoalInput({ weeklyCaloriesGoal: "", weeklyDurationGoal: "" });
    } catch (error) {
      console.error("Error saving weekly goal:", error);
    }
  };

  useEffect(() => {
    fetchWeeklyStats();
  }, []);

  const addExercise = useCallback(async () => {
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

    const calories = parseInt(exercise.caloriesBurned, 10);
    const duration = parseInt(exercise.duration, 10);

    try {
      await client.graphql({
        query: createExerciseLog,
        variables: {
          input: {
            userId: user.username,
            exerciseName: exercise.name,
            duration,
            intensity: exercise.intensity,
            caloriesBurned: calories,
            date: exercise.date,
          },
        },
      });

      if (weeklyGoal) {
        const updatedGoal = {
          id: weeklyGoal.id,
          caloriesBurned: weeklyGoal.caloriesBurned + calories,
          duration: weeklyGoal.duration + duration,
        };
        const result = await client.graphql({
          query: updateWeeklyGoal,
          variables: { input: updatedGoal },
        });
        setWeeklyGoal(result.data.updateWeeklyGoal);
      }

      fetchExerciseLogs();
    } catch (error) {
      console.error("Error adding exercise:", error);
    }

    setExercise({
      name: "",
      duration: "",
      intensity: "",
      caloriesBurned: "",
      date: new Date().toISOString().slice(0, 10),
    });
    fetchWeeklyStats();
  }, [exercise, user.username, weeklyGoal, fetchExerciseLogs]);

  const generateChartData = () => {
    const dates = Object.keys(exercisesByDate).sort();

    const caloriesData = dates.map((date) =>
      exercisesByDate[date].reduce(
        (sum, exercise) => sum + parseInt(exercise.caloriesBurned || 0, 10),
        0
      )
    );

    const durationData = dates.map((date) =>
      exercisesByDate[date].reduce(
        (sum, exercise) => sum + parseInt(exercise.duration || 0, 10),
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

  useEffect(() => {
    fetchExerciseLogs();
    fetchWeeklyGoal();
  }, [fetchExerciseLogs, fetchWeeklyGoal]);

  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-100 min-h-screen p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl max-w-4xl p-6 space-y-8 md:space-y-0 md:space-x-6">
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Exercise Tracking
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          {/* Exercise Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Exercise Name"
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={exercise.duration}
            onChange={(e) =>
              setExercise({ ...exercise, duration: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="intensity"
            placeholder="Intensity (e.g., Moderate)"
            value={exercise.intensity}
            onChange={(e) =>
              setExercise({ ...exercise, intensity: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="caloriesBurned"
            placeholder="Calories Burned"
            value={exercise.caloriesBurned}
            onChange={(e) =>
              setExercise({ ...exercise, caloriesBurned: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            name="date"
            value={exercise.date}
            onChange={(e) => setExercise({ ...exercise, date: e.target.value })}
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
          {/* Goal Inputs */}
          <input
            type="number"
            name="weeklyCaloriesGoal"
            placeholder="Set Weekly Calories Goal"
            value={goalInput.weeklyCaloriesGoal || ""}
            onChange={(e) =>
              setGoalInput({
                ...goalInput,
                weeklyCaloriesGoal: parseInt(e.target.value, 10),
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="weeklyDurationGoal"
            placeholder="Set Weekly Duration Goal (minutes)"
            value={goalInput.weeklyDurationGoal || ""}
            onChange={(e) =>
              setGoalInput({
                ...goalInput,
                weeklyDurationGoal: parseInt(e.target.value, 10),
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={saveWeeklyGoal}
            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Weekly Goal
          </button>
          {weeklyGoal && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
              <h4 className="text-center font-semibold text-blue-600 mb-4">
                Current Weekly Goals
              </h4>
              <p>Calories Goal: {weeklyGoal.weeklyCaloriesGoal}</p>
              <p>Duration Goal: {weeklyGoal.weeklyDurationGoal} mins</p>
              <p>Calories Burned: {progress.totalCalories}</p>
              <p>Duration: {progress.totalDuration} mins</p>
            </div>
          )}
        </div>
      </div>

      {/* Exercise Trends Graph */}
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
