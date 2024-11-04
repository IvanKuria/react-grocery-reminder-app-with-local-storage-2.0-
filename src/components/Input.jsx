import React, { useState, useEffect } from 'react';
import "../styles/Input.css";

function Input() {
  const [foodName, setFoodName] = useState("");
  const [date, setDate] = useState("");
  const [foodDateDict, setFoodDateDict] = useState(() => {
    // Load initial state from localStorage
    const data = window.localStorage.getItem("MY_FOOD_DICT");
    return data ? JSON.parse(data) : []; // Parse or initialize with empty array
  });

  // Store the foodDateDict object to localStorage whenever it changes
  useEffect(() => {
    window.localStorage.setItem("MY_FOOD_DICT", JSON.stringify(foodDateDict));
  }, [foodDateDict]);

  // Function to handle food name
  function handleFoodName(event) {
    setFoodName(event.target.value);
  }

  // Function to handle date
  function handleDate(event) {
    setDate(event.target.value);
  }

  // Function to handle food card creation
  function handleFoodCardCreation() {
    if (foodName && date) {
      let currDate = new Date();
      let expirationDate = new Date(date);

      // Normalize both dates to midnight to ignore the time component
      currDate.setHours(0, 0, 0, 0);
      expirationDate.setHours(0, 0, 0, 0);

      // Check if the expiration date is before the current date
      if (expirationDate < currDate) {
        alert("Expiration date cannot be before the current date");
      } else {
        // Calculate the difference in days, using Math.ceil to always round up
        const msDay = 1000 * 60 * 60 * 24;
        let diffInMs = expirationDate - currDate;
        let diffInDays = Math.ceil(diffInMs / msDay);
        if (diffInDays == 0){
          diffInDays = 1
        }
        // Add the item to the foodDateDict
        setFoodDateDict(d => [
          ...d,
          {
            food: foodName,
            daysToExpiration: diffInDays
          }
        ]);

        // Reset the input fields
        setFoodName("");
        setDate("");
      }
    } else {
      alert("One or more entries is missing!");
    }
  }

  // Function to handle deletion of a specific card
  function handleDelete(index) {
    setFoodDateDict(foodDateDict.filter((_, i) => i !== index));
  }

  // Function to get the background style based on days to expiration
  const getBackgroundStyle = (days) => {
    if (days <= 1) {
      return { backgroundImage: 'linear-gradient(to right, #ff4d4d, #ffb3b3)' }; // Red gradient
    } else if (days <= 3) {
      return { backgroundImage: 'linear-gradient(to right, #ffc107, #ffeb3b)' }; // Gold-yellow gradient
    } else if (days > 3) {
      return { backgroundImage: 'linear-gradient(to right, #57bd83, #a3e4c1)' }; // Green gradient
    } else {
      return { backgroundImage: 'linear-gradient(to right, #ddd, #f9f9f9)' }; // Default gray gradient
    }
  };

  return (
    <>
      <div className="food-input-container">
        <label htmlFor="food-name">Food Item</label>
        <input
          type="text"
          id="food-name"
          placeholder="Enter food name"
          required
          value={foodName}
          onChange={handleFoodName}
        />

        <label htmlFor="date-cooked">Expiration Date</label>
        <input
          type="date"
          id="date-cooked"
          required
          value={date}
          onChange={handleDate}
        />

        <button onClick={handleFoodCardCreation} type="button">
          Add Food
        </button>
      </div>
      <div className="food-card-container">
        <ol>
          {foodDateDict.map((pair, index) => (
            <li
              key={index}
              style={getBackgroundStyle(pair.daysToExpiration)} // Apply conditional background style
              className="food-card"
            >
              🛒 {pair.food}
              <span>{pair.daysToExpiration === 1 ? pair.daysToExpiration + " day left" : pair.daysToExpiration + " days left"}</span>
              <span className="delete-icon" onClick={() => handleDelete(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default Input;