export function renderWeatherData(weatherData) {
    let temp = document.querySelector('.temp');
    let humidity = document.querySelector('.humidity');
    let icon = document.querySelector('.icon');

    temp.textContent = weatherData.temp
    humidity.textContent = weatherData.humidity;
    // icon.src = o be continued i dont have svg yet
}

export function updateWeatherIcon(iconCode) {

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