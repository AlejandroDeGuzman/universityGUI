// import { Link } from "react-router-dom";
import headwindIcon from "../../assets/headwind.png";
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
const weatherDetails = ({ headwind_value, tailwind_value, humidity_value, wind_dir }) => {
    return (
        <div className="weather-details">
            <div className="headwind-detail">
                <div className="headwind_label">
                    <img className="headwind-icon" alt="Headwind" src={headwindIcon} />
                    <div className="weather-detail__label">Headwind</div>
                </div>
                <div className="weather-detail__value">{headwind_value}</div>
            </div>
            <div className="tailwind-detail">
                <div className="tailwind_label">
                    <img className="tailwind-icon" alt="Tailwind" src={tailwindIcon} />
                    <div className="weather-detail__label">Tailwind</div>
                </div>
                <div className="weather-detail__value">{tailwind_value}</div>
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
                <div className="weather-detail__value">{wind_dir}</div>
            </div>
        </div>
    )
};

// to be modified 
const runningCondition = (current_condition) => {
    if (current_condition === 'Mostly cloudy') {
        return 'Good';
    } else if (current_condition === 'Rainy') {
        return 'Bad';
    } else {
        return 'Unknown';
    }
}

// helper funcs for calc headwind and tailwind
function degToCompass(num) {
    const val = Math.floor((num / 22.5) + 0.5);
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[val % 16];
}

function compassToDeg(compass) {
    const mapping = {
        N: 0, NNE: 22.5, NE: 45, ENE: 67.5, E: 90, ESE: 112.5,
        SE: 135, SSE: 157.5, S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
        W: 270, WNW: 292.5, NW: 315, NNW: 337.5
    };
    return mapping[compass.toUpperCase()] ?? 0;
}

export function WeatherCard() {
    const [latLongData, setLatLongData] = useState(null);
    const [weatherAPIData, setWeatherAPIData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getBasicWeatherData = async () => {
            try {
                const latLongData = await fetchLatitudeLongitude("RG4");
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

    const windSpeed = weatherAPIData.windSpeed;
    const windDeg = weatherAPIData.windDeg;

    // ASSUMPTION: travelling in N
    const travelDeg = compassToDeg("N");
    const relativeRad = ((windDeg - travelDeg) * Math.PI) / 180;
    const windAlongTravel = windSpeed * Math.cos(relativeRad);
    const tailwind = windAlongTravel > 0 ? windAlongTravel : 0;
    const headwind = windAlongTravel < 0 ? -windAlongTravel : 0;
    const windCompass = degToCompass(windDeg);

    const weatherData = {
        current_location: latLongData.country + ", " + latLongData.city,
        current_weather: Math.round(weatherAPIData.currentTemp) + "°C",
        current_condition: weatherAPIData.currentWeather + ", " + weatherAPIData.currentCondition,
        feels_like_value: Math.round(weatherAPIData.feelsLikeTemp) + "°C",
        headwind_value: headwind + "m/s",
        tailwind_value: tailwind + "m/s",
        humidity_value: weatherAPIData.humidity + "%",
        wind_dir: windCompass + " " + weatherAPIData.windDeg,
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
                    <h2>{runningCondition(weatherData)}</h2>
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
