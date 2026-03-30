// fetch langtitude and longtitude data
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

// fetch data for current weather 
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

// fetch hourly temperature 
export const fetch24HourWeatherDataPoints = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,windspeed_10m,uv_index&timezone=auto`;

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
            temp: Math.round(temps[i]), // hourly temp data
            rain: data.hourly.precipitation_probability[i], // rain chance
            wind: Math.round(data.hourly.windspeed_10m[i]), // wind speed
            uv: data.hourly.uv_index[i] // UV index
        }))
        .filter(item => item.date === today)
        .map(item => ({
            time: item.hour,
            temp: item.temp,
            rain: item.rain,
            wind: item.wind,
            uv: item.uv
        }));
};

export const fetch7DayWeather = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,windspeed_10m_max`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
    }

    const data = await response.json();

    return data.daily.time.map((time, i) => ({
        forecast_time: new Date(time).toLocaleDateString("en-GB", { weekday: "short" }),
        max_temp: `${Math.round(data.daily.temperature_2m_max[i])}°`,
        avg_temp: `${Math.round((data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2)}°`,
        min_temp: `${Math.round(data.daily.temperature_2m_min[i])}°`,
        weatherCode: data.daily.weathercode[i],
        rain: `${data.daily.precipitation_probability_max[i]}%`,
        wind: `${Math.round(data.daily.windspeed_10m_max[i])} km/h`
    }))
}

// weather code to be mapped to the weather condition for forecast card
export const getWeatherCondition = (code) => {
    if (code === 0) return "Clear";
    if (code <= 2) return "Partly Cloudy";
    if (code <= 3) return "Overcast";
    if (code <= 49) return "Foggy";
    if (code <= 59) return "Drizzle";
    if (code <= 69) return "Rainy";
    if (code <= 79) return "Snowy";
    if (code <= 82) return "Showers";
    if (code <= 86) return "Snow Showers";
    if (code <= 99) return "Thunderstorm";
    return "Unknown";
}
