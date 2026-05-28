export function renderWeatherData(weatherData) {
    let temp = document.querySelector('.temp');
    let humidity = document.querySelector('.humidity');
    let icon = document.querySelector('.icon');

    temp.textContent = weatherData.temp
    humidity.textContent = weatherData.humidity;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
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