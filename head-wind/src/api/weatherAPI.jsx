export const fetchLatitudeLongitude = async (zipCode) => {
    const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},GB&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch latitude and longitude data.");
    }

    const data = await response.json();

    return {
        city: data.name,
        country: data.country,
        lat: data.lat,
        lon: data.lon,
    };
}

export const fetchWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
    }

    const data = await response.json();
    return {
        currentTemp: data.main.temp,
        feelsLikeTemp: data.main.feels_like,
        currentWeather: data.weather[0].main,
        currentCondition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        visibility: data.visibility,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max
    };
}

export const fetchWeatherDataPoints = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
    }

    const data = await response.json();

    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;

    return times
        .map((time, i) => ({
            date: time.split("T")[0],
            hour: time.split("T")[1].slice(0, 5),
            temp: Math.round(temps[i])
        }))
        .filter(item => item.date === today)
        .map(item => ({
            time: item.hour,
            temp: item.temp
        }));
};
