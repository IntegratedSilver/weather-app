// Function to fetch current weather data from the OpenWeatherMap API
function fetchCurrentWeather(location) {
    let apiKey = '29db8c70811a71a78c98ddaf165923b0'; // Replace 'YOUR_API_KEY' with your actual API key
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`; // API endpoint for current weather data

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Once data is received, extract necessary information and update the HTML for today's weather
            let currentTemperature = Math.round(data.main.temp); // Round temperature to the nearest integer
            let maxTemperature = Math.round(data.main.temp_max); // Round max temperature to the nearest integer
            let minTemperature = Math.round(data.main.temp_min);

            // Update the HTML elements for today's weather
            document.querySelector('.currentTemp').textContent = `${currentTemperature}°F`;
            document.querySelector('.highLow').innerHTML = `High: ${maxTemperature}°F<br>Low: ${minTemperature}°F`;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });
}

// Function to fetch forecast weather data from the OpenWeatherMap API
function fetchWeatherForecast(location) {
    let apiKey = '29db8c70811a71a78c98ddaf165923b0'; 
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`; // API endpoint for forecast weather data

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Once data is received, extract necessary information and update the HTML for each day
            let forecastData = data.list;

            // Iterate over the forecast data for each day starting from tomorrow
            for (let i = 1; i < forecastData.length; i++) {
                let forecast = forecastData[i];
                let tempElement = document.getElementsByClassName('cardTemp')[i - 1];
                tempElement.textContent = `${Math.round(forecast.main.temp)}°F`; 
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}


// Toggle side panel when hamburger button is clicked
document.getElementById('hamburgerButton').addEventListener('click', function() {
    // Toggle the active class on the side panel
    document.getElementById('sidePanel').classList.toggle('active');
    // Hide the hamburger button when the side panel is active
    document.getElementById('hamburgerButton').style.display = 'none';
});



// Close side panel when clicking anywhere else on the page
document.addEventListener('click', function(event) {
    let sidePanel = document.getElementById('sidePanel');
    let hamburgerButton = document.getElementById('hamburgerButton');
    // Check if the clicked element is not the side panel or the hamburger button
    if (!sidePanel.contains(event.target) && event.target !== hamburgerButton) {
        // Hide the side panel and show the hamburger button
        sidePanel.classList.remove('active');
        hamburgerButton.style.display = 'block';
    }
});


// Event listener for when the user submits the location
document.getElementById('searchBar').addEventListener('change', function(event) {
    let location = event.target.value.trim();
    fetchCurrentWeather(location); // Fetch current weather for today
    fetchWeatherForecast(location); // Fetch forecast weather for upcoming days
});
