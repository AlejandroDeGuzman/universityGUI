// import { Link } from "react-router-dom";
import windSpeedIcon from "../../assets/windspeed.png";
import tailwindIcon from "../../assets/tailwind.png";
import humidityIcon from "../../assets/humidity.png";
import visibilityIcon from "../../assets/visibility.png";
import locationIcon from "../../assets/location_icon.png";
import "./WeatherCard.css";
import { fetchLatitudeLongitude, fetchWeatherData } from "../../api/weatherAPI";
import { useState, useEffect } from "react";

// current location section
const currentLocation = ({ current_location }) => {
    return (
        <>
            <img className="location-icon" alt="Location" src={locationIcon} />
            {current_location}
        </>
    )
};

// current temperature and feels-like section
const currentWeather = ({ current_weather, current_condition, feels_like_value }) => {
    return (
        <div className="current-weather">
            <h1 className="current_temperature">{current_weather}</h1>
            <div className="current_weather_condition">{current_condition}</div>
            <div className="feels_like">
                <button className="feels_like_button">Feels like {feels_like_value}</button>
            </div>
        </div>
    )
};

// weather details section with headwind, tailwind, humidity, and visibility
const weatherDetails = ({ wind_speed_value, wind_dir_value, humidity_value, visibility }) => {
    return (
        <div className="weather-details">
            <div className="windspeed-detail">
                <div className="windspeed_label">
                    <img className="windspeed-icon" alt="Windspeed" src={windSpeedIcon} />
                    <div className="weather-detail__label">Wind Speed</div>
                </div>
                <div className="weather-detail__value">{wind_speed_value}</div>
            </div>
            <div className="winddir-detail">
                <div className="winddir_label">
                    <img className="winddir-icon" alt="WindDirection" src={tailwindIcon} />
                    <div className="weather-detail__label">Tailwind</div>
                </div>
                <div className="weather-detail__value">{wind_dir_value}</div>
            </div>
            <div className="humidity-detail">
                <div className="humidity_label">
                    <img className="humidity-icon" alt="Humidity" src={humidityIcon} />
                    <div className="weather-detail__label">Humidity</div>
                </div>
                <div className="weather-detail__value">{humidity_value}</div>
            </div>
            <div className="visibility-detail">
                <div className="visibility_label">
                    <img className="visibility-icon" alt="Visibility" src={visibilityIcon} />
                    <div className="weather-detail__label">Visibility</div>
                </div>
                <div className="weather-detail__value">{visibility}</div>
            </div>
        </div>
    )
};

function getRunningCondition(temp, windSpeed, visibility, weatherMain) {
    let score = 100;

    // --- Temperature (ideal: ~8–15°C) ---
    if (temp < 0) score -= 30;
    else if (temp < 5) score -= 15;
    else if (temp > 25) score -= 20;
    else if (temp > 18) score -= 10;

    // --- Wind (harder running) ---
    if (windSpeed > 10) score -= 25;
    else if (windSpeed > 6) score -= 15;
    else if (windSpeed > 3) score -= 5;

    // --- Visibility ---
    if (visibility < 500) score -= 30;
    else if (visibility < 2000) score -= 15;
    else if (visibility < 5000) score -= 5;

    // --- Weather conditions ---
    if (["thunderstorm"].includes(weatherMain)) score -= 40;
    else if (["snow"].includes(weatherMain)) score -= 25;
    else if (["rain", "drizzle"].includes(weatherMain)) score -= 20;
    else if (["mist", "fog", "haze"].includes(weatherMain)) score -= 15;

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    // --- Convert score to label ---
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Moderate";
    if (score >= 30) return "Poor";
    return "Very Poor";
}

function degreesToCompass16(deg) {
    const directions = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ];

    const normalizedDeg = ((deg % 360) + 360) % 360;
    const index = Math.round(normalizedDeg / 22.5) % 16;

    return directions[index];
}

export function WeatherCard() {
    const [latLongData, setLatLongData] = useState(null);
    const [weatherAPIData, setWeatherAPIData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getBasicWeatherData = async () => {
            try {
                const latLongData = await fetchLatitudeLongitude("E14");
                const weatherAPIData = await fetchWeatherData(latLongData.lat, latLongData.lon);
                setLatLongData(latLongData);
                setWeatherAPIData(weatherAPIData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getBasicWeatherData();

    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const weatherData = {
        current_location: latLongData.country + ", " + latLongData.city,
        current_weather: Math.round(weatherAPIData.currentTemp) + "°C",
        current_condition: weatherAPIData.currentWeather + ", " + weatherAPIData.currentCondition,
        feels_like_value: Math.round(weatherAPIData.feelsLikeTemp) + "°C",
        wind_speed_value: weatherAPIData.windSpeed + "m/s",
        wind_dir_value: degreesToCompass16(weatherAPIData.windDeg) + ", " + weatherAPIData.windDeg + "°",
        humidity_value: weatherAPIData.humidity + "%",
        visibility: weatherAPIData.visibility / 1000 + "km",
        // running_condition: 'Mostly cloudy'
    };

    return (
        <div className="weather-card">
            <div className="location">
                {currentLocation(weatherData)}
            </div>
            <div className="weather-card_main">
                {currentWeather(weatherData)}
                {weatherDetails(weatherData)}
                <div className="running-condition">
                    <h3>Running Condition:</h3>
                    <h2>{getRunningCondition(weatherAPIData.temp, weatherAPIData.windSpeed, weatherAPIData.visibility, weatherAPIData.currentCondition)}</h2>
                    <ul>
                        <li>Good: Clear, mostly clear, partly cloudy</li>
                        <li>Bad: Rain, snow, thunderstorms</li>
                        <li>Unknown: Other conditions</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default WeatherCard;
