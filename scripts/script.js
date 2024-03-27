// Function to fetch current weather data from the OpenWeatherMap API
function fetchCurrentWeather(location) {
  let apiKey = "29db8c70811a71a78c98ddaf165923b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`; // API endpoint for current weather data

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Once data is received, extract necessary information and update the HTML for today's weather
      let currentTemperature = Math.round(data.main.temp); //
      let maxTemperature = Math.round(data.main.temp_max); // .round rounds the temperature to the nearest integer
      let minTemperature = Math.round(data.main.temp_min);
      let cityName = data.name; // Get the name of the city
      let currentTime = new Date(data.dt * 1000);
      let options = { hour: "numeric", minute: "numeric", hour12: true };
      let formattedTime = new Intl.DateTimeFormat("en-US", options).format(
        currentTime
      ); // Format the time
      let weatherCondition = data.weather[0].icon;

      // Update the HTML elements for today's weather
      document.querySelector(
        ".currentTemp"
      ).textContent = `${currentTemperature}°`;
      document.querySelector(
        ".highLow"
      ).innerHTML = `High: ${maxTemperature}°F<br>Low: ${minTemperature}°`;
      document.querySelector(".time").textContent = formattedTime;
      document.querySelector(".city").textContent = cityName;
      document
        .querySelector(".main-forecast-icon")
        .setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${weatherCondition}.png`
        );
      document
        .querySelector(".main-forecast-icon")
        .setAttribute("alt", "Weather Icon");
    })
   
}

function fetchWeatherForecast(location) {
  let apiKey = "29db8c70811a71a78c98ddaf165923b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let forecastData = data.list;

      // Iterate over the forecast data for each day starting from tomorrow
      for (let i = 1; i < forecastData.length; i++) {
        let forecast = forecastData[i];
        let tempElement = document.getElementsByClassName("cardTemp")[i - 1];
        tempElement.textContent = `${Math.round(forecast.main.temp)}°`;

        // Update the weather icon for the forecast day
        let weatherIcon =
          document.getElementsByClassName("forecast-icon")[i - 1];
        let iconCode = forecast.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.setAttribute("src", iconUrl);
        weatherIcon.setAttribute("alt", "Weather Icon");
      }
    })
  
}
//displays the current weekday name
function updateTodayDayOfWeek() {
  let currentDate = new Date();
  let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDayOfWeek = daysOfWeek[currentDate.getDay()];

  document.querySelector('.dayOfWeek').textContent = currentDayOfWeek;
}


updateTodayDayOfWeek();

// Toggle side panel when hamburger button is clicked
document
  .getElementById("hamburgerButton")
  .addEventListener("click", function () {
    // Toggle the active class on the side panel
    document.getElementById("sidePanel").classList.toggle("active");
    // Hide the hamburger button when the side panel is active
    document.getElementById("hamburgerButton").style.display = "none";
  });

// Close side panel when clicking anywhere else on the page
document.addEventListener("click", function (event) {
  let sidePanel = document.getElementById("sidePanel");
  let hamburgerButton = document.getElementById("hamburgerButton");
  // Check if the clicked element is not the side panel or the hamburger button
  if (!sidePanel.contains(event.target) && event.target !== hamburgerButton) {
    // Hide the side panel and show the hamburger button
    sidePanel.classList.remove("active");
    hamburgerButton.style.display = "block";
  }
});

// Event listener for when the user submits the location
document
  .getElementById("searchBar")
  .addEventListener("change", function (event) {
    let location = event.target.value.trim();
    fetchCurrentWeather(location); // Fetch current weather for today
    fetchWeatherForecast(location); // Fetch forecast weather for upcoming days
  });

document
  .getElementById("searchBar")
  .addEventListener("keydown", function (event) {
    if (event.key === "+") {
      let location = event.target.value.trim();
      fetchCurrentWeather(location); // Fetch current weather for today
      fetchWeatherForecast(location); // Fetch forecast weather for upcoming days

      // Add the location to the favorites list
      addToFavorites(location);

      // Clear the input field after adding to favorites
      event.target.value = "";
    }
  });

function addToFavorites(location) {
  let favoritesList = document.getElementById("favoritesList");

  // Create a new h3 element for the location
  let newLocation = document.createElement("h3");
  newLocation.textContent = location;

  // Add the class "favorite-item" to the new location element
  newLocation.classList.add("favorite-item");

  // Add event listener to fetch and display weather for the location when clicked
  newLocation.addEventListener("click", function () {
    fetchCurrentWeather(location);
    fetchWeatherForecast(location);
  });

  // Create a span element for the trash can icon
  let deleteIcon = document.createElement("span");
  deleteIcon.textContent = "🗑️";
  deleteIcon.classList.add("delete-icon");

  // Add event listener to delete the location when clicked
  deleteIcon.addEventListener("click", function () {
    favoritesList.removeChild(newLocation);
  });

  newLocation.appendChild(deleteIcon);
  favoritesList.appendChild(newLocation);
}