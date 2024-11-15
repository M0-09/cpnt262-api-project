"use strict";

// declare variables

const form = document.getElementById("weatherForm");
const city = document.getElementById("city");
const username = document.getElementById("username");
const remember = document.getElementById("remember");
const apiKey = "a1025ddda83b10393d79f1c15d7e8dc0";

form.addEventListener("submit", async (event) => {
  // event.preventDefault(); // prevent form submission
  const cityInput = city.value;
  // const usernameInput = username.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
      console.log(`weatherData`, weatherData);
      // Using Object Destructuring to extract values from Weather Data

      // saveLocalStorage([
      //   { name: weatherData.main.name, temp, humidity, description, id },
      // ]);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Enter a valid City");
  }
});

// async function getWeather(city) {}

// function displayWeather(weatherData) {}

// function displayError(message) {
//   const errorDisplay = document.createElement("p");
//   errorDisplay.textContent = message;
//   document.body.appendChild(errorDisplay);
// }

// get the name first from cookie, if not, from local storage
getCookie();
username.value = localStorage.getItem("username");

// get city from session storage
city.value = sessionStorage.getItem("city");

// save user preferences
function savePreferences() {
  saveLocalStorage("username");
  saveSessionStorage("city");
}

// save to local storage
function saveLocalStorage(username) {
  let data = document.getElementById(id).value;
  localStorage.setItem(id, data);
}

// save to session storage
function saveSessionStorage(id) {
  const data = document.getElementById(id).value;
  sessionStorage.setItem(id, data);
}

//cookie functions
function getCookie(username) {
  const cookies = document.cookie;
  username.value = cookies.substring(9);
}

function saveCookie(id) {
  let data = document.getElementById(id).value;
  document.cookie = `myCookie=${data}; max-age=300`;
}
