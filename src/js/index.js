import '../css/style.css';

import { getWeatherData, fetchCitySuggestion } from './api.js';
import { renderWeatherData, 
         renderErrorMessage, 
         clearErrorMessage, 
         clearFormInput, 
         updateWeatherIcon, 
         showLoadingState, 
         hideLoadingState,
         renderSuggestions,
         clearSuggestions } from './dom.js';

const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
let timer;

cityInput.addEventListener('input', (e) => {
  clearTimeout(timer);
  const query = e.target.value.trim();
  if(query.length === 0) {
    clearSuggestions();
    return;
  }

  timer = setTimeout(async () =>{
    const suggestions = await fetchCitySuggestion(query);
    if(suggestions.length > 0) {
      renderSuggestions(suggestions);
    } else {
      clearSuggestions();
    }
  }, 300);
});

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cityName = cityInput.value;
  clearErrorMessage();
  showLoadingState();

  try {
    let weatherData = await getWeatherData(cityName);
    renderWeatherData(weatherData);  
  } catch (error) {
    renderErrorMessage('Something went wrong fetching data');
  } finally {
    hideLoadingState();
  }
  
  clearFormInput();
});