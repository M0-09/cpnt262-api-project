"use strict";

// declare variables

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");
const username = document.getElementById("username");
const remember = document.getElementById("remember");
const apiKey = "a1025ddda83b10393d79f1c15d7e8dc0";
const card = document.querySelector(".card");
const toggleButton = document.getElementById("unitToggle");

let unit = `metric`;

// Event Listener for form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent form submission
  saveSessionStorage();
  saveCookie();
  const cityInput = city.value.trim();

  if (cityInput) {
    try {
      const weatherForecast = await getWeatherForecast(cityInput);
      displayWeatherInfo(weatherForecast);
      console.log(`weatherForecast)`, weatherForecast);
      saveLocalStorage(
        JSON.stringify([
          {
            name: weatherForecast.main.name,
            temp: weatherForecast.main.temp,
            humidity: weatherForecast.main.humidity,
            description: weatherForecast.weather[0].description,
            id: weatherForecast.weather[0].id,
          },
        ])
      );
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  } else {
    displayError("Please enter a valid city name.");
  }

  // name validation
  if (username.value !== "") {
    hideError("name-error");
  } else {
    showError("name-error");
  }
});

toggleButton.addEventListener(`change`, function () {
  unit = toggleButton.click ? `imperial` : `metric`;
  if (cityInput.value.trim()) {
    getWeatherForecast(cityInput.value.trim()); // This if statement will re-fetch the weather data if the toggle is switched
  }
});

// Fetch weather data from OpenWeatherMap API
async function getWeatherForecast(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("couldn't fetch weather forecast");
  }
  return await response.json();
}

// functions to display weather information
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1"); //Creating H1 Element using Javascript
  const tempDisplay = document.createElement("p"); //Creating Paragraph Element using Javascript
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${
    unit === `metric`
      ? (temp - 273.15).toFixed(1) // Converts Kelvin to Celsius by subtracting 273.15 (".toFixed" means rounding up to one decimal place)
      : (((temp - 273.15) * 9) / 5 + 32).toFixed(1) // Converts Kelvin to Fahrenheit by subtracting 273.15 but then also multiply by 9/5 + 32
  }°${unit === `metric` ? `C` : `F`}`;

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = `${description}`;

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
}

// functions to display error messages
function displayError(message) {
  const displayMessage = document.createElement("p");
  displayMessage.textContent = message;
  displayMessage.textContent = message;
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(displayMessage);
}

// hide/show error functions
function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "none";
}

function showError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "block";
}
// save data to session storage
function saveSessionStorage() {
  const cityData = document.querySelector("#city").value;

  sessionStorage.setItem(`city`, cityData);
}

// save data to local storage
function saveLocalStorage(weatherForecast) {
  const nameData = document.getElementById("username").value;
  const cityData = document.getElementById("city").value;

  localStorage.setItem(`nameInput`, nameData);
  localStorage.setItem(`city`, cityData);
  localStorage.setItem(`savedWeatherData`, weatherForecast);
}

// save cookie
function saveCookie() {
  const cookieData = document.getElementById("username").value;
  document.cookie = `myCookie=${cookieData}; max-age=300`;
  document.getElementById("username").value = "data";
}
