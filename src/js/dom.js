import { getWeatherData } from "./api.js"; 

export function renderWeatherData(weatherData) {
    const weatherDisplay = document.querySelector('.weather-display');
    
    if (weatherDisplay) {
        weatherDisplay.classList.remove('hidden');
    }
    
    let cityName = document.querySelector('.city-name');
    let temp = document.querySelector('.temp');
    let humidity = document.querySelector('.humidity');

    cityName.textContent = weatherData.name;
    temp.textContent = weatherData.temp
    humidity.textContent = weatherData.humidity;
    updateWeatherIcon(weatherData.icon);
    updateWeatherBackground(weatherData.icon);
}

export function updateWeatherIcon(iconCode) {
    let icon = document.querySelector('.icon');
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function showLoadingState() {
    const spinner = document.querySelector('.loading-spinner');
    spinner.classList.remove('hidden');
}

export function hideLoadingState() {
    const spinner = document.querySelector('.loading-spinner');
    spinner.classList.add('hidden');
}

export function renderErrorMessage(message) {
    let errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = message;
}

export function clearErrorMessage() {
    let errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = '';
}

export function clearFormInput() {
    const cityInput = document.querySelector('.city-input');
    if (cityInput) {
        cityInput.value = '';
    }
}

export function renderSuggestions(citiesArray) {
    const dropdown = document.querySelector('.suggestions-dropdown');
    clearSuggestions();
    dropdown.classList.remove('hidden');
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
    dropdown.classList.add('hidden');
}

export function updateWeatherBackground(iconCode) {
    const body = document.body;
    
    const condition = iconCode.substring(0, 2); 
    const isNight = iconCode.endsWith('n');

    if (isNight) {
        body.style.background = "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"; // Deep Night
        return;
    }

    switch (condition) {
        case '01': // Clear Sky
            body.style.background = "linear-gradient(135deg, #2980b9 0%, #6dd5fa 50%, #ffffff 100%)";
            break;
        case '02': // Few Clouds
        case '03': // Scattered Clouds
        case '04': // Broken Clouds
            body.style.background = "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)";
            break;
        case '09': // Shower Rain
        case '10': // Rain
        case '11': // Thunderstorm
            body.style.background = "linear-gradient(135deg, #3a6073 0%, #3a7bd5 100%)";
            break;
        case '13': // Snow
            body.style.background = "linear-gradient(135deg, #e6dada 0%, #274046 100%)";
            break;
        case '50': // Mist / Fog
            body.style.background = "linear-gradient(135deg, #606c88 0%, #3f5c80 100%)";
            break;
        default:
            body.style.background = "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)"; // Default fallback
    }
}