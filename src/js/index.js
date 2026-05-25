import '../css/style.css';

import { getWeatherData } from './api.js';
import { renderWeatherData, 
         renderErrorMessage, 
         clearErrorMessage, 
         clearFormInput, 
         updateWeatherIcon, 
         showLoadingState, 
         hideLoadingState } from './dom.js';

const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cityName = cityInput.value;
  clearErrorMessage();
  let weatherData = await getWeatherData(cityName);
  renderWeatherData(weatherData);
  clearFormInput();
});