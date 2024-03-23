// Function to fetch current weather data from the OpenWeatherMap API
function fetchCurrentWeather(location) {
    let apiKey = '29db8c70811a71a78c98ddaf165923b0'; // Replace 'YOUR_API_KEY' with your actual API key
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`; // API endpoint for current weather data

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Once data is received, extract necessary information and update the HTML for today's weather
            let currentTemperature = data.main.temp;
            let maxTemperature = data.main.temp_max;
            let minTemperature = data.main.temp_min;

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
                tempElement.textContent = `${forecast.main.temp}°F`;
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

// Event listener for when the user submits the location
document.getElementById('searchBar').addEventListener('change', function(event) {
    let location = event.target.value.trim();
    fetchCurrentWeather(location); // Fetch current weather for today
    fetchWeatherForecast(location); // Fetch forecast weather for upcoming days
});
