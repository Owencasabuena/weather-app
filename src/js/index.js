import '../css/style.css';

import { getWeatherData } from './api.js';

async function testApiCall() {
  try {
    console.log("Fetching weather data for Dasmariñas...");
    const weather = await getWeatherData('Dasmariñas');
    
    console.log("Success! Here is your clean weather object:");
    console.log(weather);
  } catch (error) {
    console.error("Something went wrong with the fetch:", error);
  }
}

testApiCall();