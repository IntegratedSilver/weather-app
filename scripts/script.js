// Function to fetch current weather data from the OpenWeatherMap API
function fetchWeatherData(location) {
    let apiKey = '29db8c70811a71a78c98ddaf165923b0'; // Replace 'YOUR_API_KEY' with your actual API key
    let apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=29db8c70811a71a78c98ddaf165923b0&Units=imperial`; // API endpoint for current weather data

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Once data is received, extract necessary information and update the HTML
            let currentTemperature = data.main.temp;
            let maxTemperature = data.main.temp_max;
            let minTemperature = data.main.temp_min;

            // Update current temperature
            document.querySelector('.currentTemp').textContent = `${currentTemperature}°`;

            // Update high and low temperatures
            document.querySelector('.highLow').innerHTML = `High: ${maxTemperature}°<br>Low: ${minTemperature}°`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Event listener for when the user submits the location
document.getElementById('searchBar').addEventListener('change', function(event) {
    let location = event.target.value.trim();
    fetchWeatherData(location);
});
