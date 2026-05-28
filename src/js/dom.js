import { getWeatherData } from "./api.js"; 

export function renderWeatherData(weatherData) {
    let temp = document.querySelector('.temp');
    let humidity = document.querySelector('.humidity');
    let icon = document.querySelector('.icon');

    temp.textContent = weatherData.temp
    humidity.textContent = weatherData.humidity;
    updateWeatherIcon(weatherData.icon);
}

export function updateWeatherIcon(iconCode) {
    let icon = document.querySelector('.icon');
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function showLoadingState() {

}

export function hideLoadingState() {}

export function renderErrorMessage(message) {
    let errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = message;
}

export function clearErrorMessage() {
    let errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = '';
}

export function clearFormInput() {
    let cityInput = document.querySelector('.city-input');
    cityInput.value = '';
}

export function renderSuggestions(citiesArray) {
    const dropdown = document.querySelector('.suggestions-dropdown');
    clearSuggestions();

    citiesArray.forEach(city => {
        let cityList = document.createElement('li');
        cityList.textContent = `${city.name}, ${city.country}`;
        cityList.className = 'suggestion-item';

        cityList.addEventListener('click', async () => {
            const cityInput = document.querySelector('.city-input');
            cityInput.value = city.name;
            clearSuggestions();
            const weatherData = await getWeatherData(city.name);
            renderWeatherData(weatherData);
        });
        dropdown.appendChild(cityList);
    });
}

export function clearSuggestions() {
    let dropdown = document.querySelector('.suggestions-dropdown');
    dropdown.innerHTML = '';   
}