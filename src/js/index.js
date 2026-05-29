import '../css/style.css';

import { getWeatherData, getWeatherByCoords, fetchCitySuggestion } from './api.js';
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
  if (!e.target) return;

  const query = e.target.value.trim();
  if(query.length === 0) {
    clearSuggestions();
    return;
  }

  timer = setTimeout(async () => {
    try {
      const suggestions = await fetchCitySuggestion(query);
      if(Array.isArray(suggestions) && suggestions.length > 0) {
        renderSuggestions(suggestions);
      } else {
        clearSuggestions();
      }
    } catch (err) {
      console.error("Suggestion loop error caught safely:", err);
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

async function initializeApp() {
    showLoadingState();

    if (!navigator.geolocation) {
        loadFallbackCity();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            try {
                const localData = await getWeatherByCoords(lat, lon);
                renderWeatherData(localData);
            } catch (error) {
                renderErrorMessage("Failed to load local weather.");
                loadFallbackCity();
            } finally {
                hideLoadingState();
            }
        },
        
        (error) => {
            console.warn("Location access denied or unavailable. Switching to default city search.");
            loadFallbackCity();
        }
    );
}

async function loadFallbackCity() {
    const defaultCity = "Manila";
    try {
        let defaultData = await getWeatherData(defaultCity);
        renderWeatherData(defaultData);
    } catch (err) {
        renderErrorMessage("Welcome! Search for a city to get started.");
      } finally {
        hideLoadingState();
    }
}

initializeApp();