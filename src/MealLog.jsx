import React, { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createMealLog } from "./graphql/mutations";
import { listMealLogs } from "./graphql/queries";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

// Initialize AWS Amplify API Client
const client = generateClient();

const MealLog = ({ user }) => {
  const [meal, setMeal] = useState({
    name: "",
    portionSize: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    date: new Date().toISOString().slice(0, 10),
    time: "12:00",
  });

  const [meals, setMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [summaryType, setSummaryType] = useState("daily");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMealLogs();
  }, []);

  const fetchMealLogs = async () => {
    try {
      const response = await client.graphql(
        graphqlOperation(listMealLogs, {
          filter: { userId: { eq: user.username } },
        })
      );
      setMeals(response.data.listMealLogs.items);
    } catch (err) {
      console.error("Error fetching meal logs:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeal((prevMeal) => ({ ...prevMeal, [name]: value }));
  };

  const addMeal = async () => {
    if (
      !meal.name ||
      !meal.portionSize ||
      !meal.calories ||
      !meal.protein ||
      !meal.carbs ||
      !meal.fats
    ) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");

    const newMeal = {
      userId: user.username,
      name: meal.name,
      portionSize: parseInt(meal.portionSize, 10),
      calories: parseInt(meal.calories, 10),
      protein: parseInt(meal.protein, 10),
      carbs: parseInt(meal.carbs, 10),
      fats: parseInt(meal.fats, 10),
      date: meal.date,
      time: meal.time,
    };

    try {
      await client.graphql(graphqlOperation(createMealLog, { input: newMeal }));

      setMeal({
        name: "",
        portionSize: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        date: new Date().toISOString().slice(0, 10),
        time: "12:00",
      });

      fetchMealLogs();
    } catch (err) {
      console.error("Error adding meal log:", err);
    }
  };

  const getMealsForSelectedDate = () => {
    return meals.filter(
      (m) => m.date === selectedDate.toISOString().slice(0, 10)
    );
  };

  const getSummary = () => {
    let filteredMeals = meals;

    if (summaryType === "daily") {
      filteredMeals = meals.filter(
        (m) => m.date === selectedDate.toISOString().slice(0, 10)
      );
    } else {
      const range =
        summaryType === "weekly"
          ? { start: startOfWeek(selectedDate), end: endOfWeek(selectedDate) }
          : {
              start: startOfMonth(selectedDate),
              end: endOfMonth(selectedDate),
            };

      filteredMeals = meals.filter(
        (m) => new Date(m.date) >= range.start && new Date(m.date) <= range.end
      );
    }

    return filteredMeals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fats += meal.fats;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  const summary = getSummary();

  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-100 min-h-screen p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl max-w-4xl p-6 space-y-8 md:space-y-0 md:space-x-6">
        {/* Left: Form Inputs */}
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600 text-center">
            Meal Logging
          </h2>
          {error && <p className="text-red-600 text-center">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Food Item"
            value={meal.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="portionSize"
            placeholder="Portion Size (g)"
            value={meal.portionSize}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="calories"
            placeholder="Calories"
            value={meal.calories}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="protein"
            placeholder="Protein (g)"
            value={meal.protein}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="carbs"
            placeholder="Carbs (g)"
            value={meal.carbs}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="fats"
            placeholder="Fats (g)"
            value={meal.fats}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            name="date"
            value={meal.date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="time"
            name="time"
            value={meal.time}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={addMeal}
            className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Meal
          </button>
        </div>

        {/* Right: Calendar + Summary */}
        <div className="md:w-1/3 min-w-[300px] space-y-4">
          <h3 className="text-lg font-semibold text-blue-500 text-center">
            Select Date
          </h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-full"
          />

          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
            <h4 className="text-center font-semibold text-blue-600 mb-4">
              {summaryType.charAt(0).toUpperCase() + summaryType.slice(1)}{" "}
              Summary
            </h4>
            <p>Calories: {summary.calories} kcal</p>
            <p>Protein: {summary.protein} g</p>
            <p>Carbs: {summary.carbs} g</p>
            <p>Fats: {summary.fats} g</p>
          </div>
        </div>
      </div>
      {/* Meal Logs for Selected Date */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 mt-6">
        <h3 className="text-lg font-semibold text-blue-500 text-center mb-4">
          Meals for {selectedDate.toLocaleDateString()}
        </h3>
        {getMealsForSelectedDate().length === 0 ? (
          <p className="text-gray-600 text-center">
            No meals logged for this day.
          </p>
        ) : (
          <ul className="space-y-4">
            {getMealsForSelectedDate().map((m) => (
              <li
                key={m.id}
                className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
              >
                <p className="font-semibold text-gray-800">{m.name}</p>
                <p className="text-gray-600">Portion Size: {m.portionSize}g</p>
                <p className="text-gray-600">Calories: {m.calories} kcal</p>
                <p className="text-gray-600">Protein: {m.protein}g</p>
                <p className="text-gray-600">Carbs: {m.carbs}g</p>
                <p className="text-gray-600">Fats: {m.fats}g</p>
                <p className="text-gray-600">Time: {m.time}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MealLog;
