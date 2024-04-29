function updateWeatherData(response) {
    let temperatureElement = document.querySelector("#temperature-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#weather-descriptor");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#date-time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#weather-icon")
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-image" />`
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}mph`
    temperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day}, ${hours}:${minutes}`
}


function searchCity(city) {
    let apiKey = `f917a08757btf485b3af40o0e41087f1`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateWeatherData);
}


function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function getForecast(city) {
    let apiKey = `f917a08757btf485b3af40o0e41087f1`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);
    let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function(day) {
        forecastHtml = forecastHtml + 
        `
        <div class="weather-forecast-day-container">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" />
        </div>
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">56°</span>
            <span class="weather-forecast-temperature-min">44°</span>
        </div>
        </div>
        `;
    }
    )

    let weatherForecastElement = document.querySelector("#weather-forecast");
    weatherForecastElement.innerHTML = forecastHtml;
}

searchCity("Portland");

