const API_KEY = process.env.OPENWEATHER_API_KEY;

async function fetchCoordinates(cityName) {
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`); 
    let data = await response.json();
    
    return {lat: data[0].lat, lon: data[0].lon};
}

async function fetchRawWeatherByCoords(lat, lon) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    let data = await response.json();

    return data;
}

async function processWeatherData(data) {
    return {
        temp: data.main.temp,
        humidity: data.main.humidity,
        icon: data.weather[0].icon
    };
}

export async function getWeatherData(cityName) {
    let coordinates = await fetchCoordinates(cityName);
    let rawWeatherData = await fetchRawWeatherByCoords(coordinates.lat, coordinates.lon);
    let cleanData = processWeatherData(rawWeatherData);

    return cleanData;
}
