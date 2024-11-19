import React, { useState, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { v4 as uuidv4 } from "uuid";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
} from "date-fns";

const MealLog = ({ mealsByDate, setMealsByDate }) => {
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
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [summaryType, setSummaryType] = useState("daily");
  const [viewDate, setViewDate] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeal((prevMeal) => ({ ...prevMeal, [name]: value }));
  };

  const addMeal = useCallback(() => {
    if (
      !meal.name ||
      !meal.portionSize ||
      !meal.calories ||
      !meal.protein ||
      !meal.carbs ||
      !meal.fats ||
      !meal.date ||
      !meal.time
    ) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");

    const mealDate = new Date(meal.date).toISOString().slice(0, 10);
    const newMealEntry = { ...meal, date: mealDate, id: uuidv4() };

    setMealsByDate((prevMealsByDate) => {
      const updatedMeals = { ...prevMealsByDate };
      if (!updatedMeals[mealDate]) {
        updatedMeals[mealDate] = [];
      }
      updatedMeals[mealDate] = [...updatedMeals[mealDate], newMealEntry];
      return updatedMeals;
    });

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
  }, [meal, setMealsByDate]);

  const displayMealsForSelectedDate = () => {
    const dateKey = viewDate.toISOString().slice(0, 10);
    return mealsByDate[dateKey] || [];
  };

  const calculateSummary = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    const selectedISODate = selectedDate.toISOString().slice(0, 10);

    if (summaryType === "daily") {
      const dailyMeals = mealsByDate[selectedISODate] || [];
      dailyMeals.forEach((meal) => {
        totalCalories += parseInt(meal.calories, 10);
        totalProtein += parseInt(meal.protein, 10);
        totalCarbs += parseInt(meal.carbs, 10);
        totalFats += parseInt(meal.fats, 10);
      });
    } else {
      const dateRange =
        summaryType === "weekly"
          ? { start: startOfWeek(selectedDate), end: endOfWeek(selectedDate) }
          : {
              start: startOfMonth(selectedDate),
              end: endOfMonth(selectedDate),
            };

      for (const date in mealsByDate) {
        const mealDate = parseISO(date);
        if (isWithinInterval(mealDate, dateRange)) {
          mealsByDate[date].forEach((meal) => {
            totalCalories += parseInt(meal.calories, 10);
            totalProtein += parseInt(meal.protein, 10);
            totalCarbs += parseInt(meal.carbs, 10);
            totalFats += parseInt(meal.fats, 10);
          });
        }
      }
    }

    return { totalCalories, totalProtein, totalCarbs, totalFats };
  };

  const summary = calculateSummary();

  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-100 min-h-screen p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl max-w-4xl p-6 space-y-8 md:space-y-0 md:space-x-6">
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Meal Logging
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Food Item"
            autoComplete="off"
            value={meal.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="portionSize"
            placeholder="Portion Size"
            autoComplete="off"
            value={meal.portionSize}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="calories"
            placeholder="Calories"
            autoComplete="off"
            value={meal.calories}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="protein"
            placeholder="Protein (g)"
            autoComplete="off"
            value={meal.protein}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="carbs"
            placeholder="Carbs (g)"
            autoComplete="off"
            value={meal.carbs}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            name="fats"
            placeholder="Fats (g)"
            autoComplete="off"
            value={meal.fats}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            name="date"
            autoComplete="off"
            value={meal.date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="time"
            name="time"
            autoComplete="off"
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

        <div className="md:w-1/3 min-w-[300px]">
          <h3 className="text-lg font-semibold text-blue-500 mb-4 text-center">
            Select Date
          </h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) => {
              const dateKey = date.toISOString().slice(0, 10);
              return mealsByDate[dateKey] ? "bg-blue-100" : null;
            }}
            className="w-full"
          />
          <div className="mt-6">
            <label className="block text-center font-semibold text-blue-500 mb-2">
              View Summary
            </label>
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
            <h4 className="text-center font-semibold text-blue-600 mb-4">
              {summaryType.charAt(0).toUpperCase() + summaryType.slice(1)}{" "}
              Summary
            </h4>
            <p>Calories: {summary.totalCalories} kcal</p>
            <p>Protein: {summary.totalProtein} g</p>
            <p>Carbs: {summary.totalCarbs} g</p>
            <p>Fats: {summary.totalFats} g</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-6 bg-white rounded-lg shadow-xl p-6">
        <h3 className="text-lg font-semibold text-blue-500 mb-4 text-center">
          Meals for {viewDate.toLocaleDateString()}
        </h3>
        <Calendar
          onChange={setViewDate}
          value={viewDate}
          className="mb-6 w-full"
        />
        {displayMealsForSelectedDate().length === 0 ? (
          <p className="text-gray-600 text-center">
            No meals logged for this day.
          </p>
        ) : (
          <ul className="space-y-4">
            {displayMealsForSelectedDate().map((m) => (
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
