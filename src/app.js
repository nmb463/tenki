function updateWeatherData(response) {
    let temperatureElement = document.querySelector("#temperature-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
    let apiKey = "f917a08757btf485b3af40o0e41087f1";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`
    axios.get(apiUrl).then(updateWeatherData);
}


function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Honolulu");