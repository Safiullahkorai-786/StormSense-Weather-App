document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const recentSearchesList = document.getElementById('recent-searches');
    const locationSection = document.getElementById('location');
    const currentWeather = document.getElementById('current-weather');
    const weatherInfo = document.getElementById('weather-info');
    const forecastSection = document.getElementById('forecast');
    const forecastInfo = document.getElementById('forecast-info');

    // Function to fetch weather data
    function fetchWeatherData(city) {
        const apiKey = 'd88980a18f7f940a078519c4d7b34d98';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        // Fetch current weather
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const { name, main } = data;
                locationSection.innerHTML = `<h2>Location</h2><p>${name}</p>`;
                weatherInfo.innerHTML = `<h2>Current Weather</h2><p>Temperature: ${main.temp}°C</p><p>Humidity: ${main.humidity}%</p>`;
                // Update recent searches
                updateRecentSearches(name);
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error);
                weatherInfo.innerHTML = '<p>Failed to fetch current weather data</p>';
            });

        // Fetch weather forecast
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                const forecast = data.list.slice(0, 5); // Get next 5 forecast entries
                forecastInfo.innerHTML = `<h2>Weather Forecast</h2>`;
                forecast.forEach(entry => {
                    const date = new Date(entry.dt * 1000);
                    const temperature = entry.main.temp;
                    const description = entry.weather[0].description;
                    forecastInfo.innerHTML += `<p>${date.toLocaleDateString()} - ${description}, ${temperature}°C</p>`;
                });
            })
            .catch(error => {
                console.error('Error fetching weather forecast data:', error);
                forecastInfo.innerHTML = '<p>Failed to fetch weather forecast data</p>';
            });
    }

    // Function to update recent searches
    function updateRecentSearches(city) {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        recentSearchesList.prepend(listItem); // Add new search to the top of the list
    }

    // Event listener for search form submission
    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const city = searchInput.value.trim();
        if (city) {
            fetchWeatherData(city);
            searchInput.value = '';
        }
    });

    // Fetch weather data for default city on page load
    fetchWeatherData('Pano Aqil');
});
