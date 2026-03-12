// import { Group } from "./Group";
// import humidityIcon from "./image-4.png";
// import visibilityIcon from "./image-5.png";
// import windIcon from "./tailwind.svg";
import "./WeatherCard.css";


// Variables for current weather section //
const weatherData = {
    current_location: 'London, United Kingdom',
    current_weather: '7°',
    current_condition: 'Mostly cloudy',
    feels_like_value: '5°',
    headwind_value: 'NW',
    tailwind_value: 'NW',
    humidity_value: '85%',
    visibility_value: '9.5 km',
    // running_condition: 'Mostly cloudy'
};
 

const currentLocation = ({current_location}) => {
    return (
        <div className="current-location">
            {/* <img className="location-icon" alt="Location" src={locationIcon} /> */}
            {current_location}
        </div>
    )
};


const currentWeather = ({current_weather, current_condition, feels_like_value}) => {
    return (
        <div className="current-weather">
            <h1 className="current_temperature">{current_weather}</h1>
            <div className="current_weather_condition">{current_condition}</div>
            <button className="feels_like">Feels like {feels_like_value}</button>
        </div>
    )
};

const weatherDetails = ({headwind_value, tailwind_value, humidity_value, visibility_value}) => {
    return (
        <div className="weather-details">
            <div className="headwind-detail">
                {/* <img className="headwind-icon" alt="Headwind" src={windIcon} /> */}
                <div className="weather-detail__label">Headwind</div>
                <div className="weather-detail__value">{headwind_value}</div>
            </div>
            <div className="tailwind-detail">
                {/* <img className="tailwind-icon" alt="Tailwind" src={windIcon} /> */}
                <div className="weather-detail__label">Tailwind</div>
                <div className="weather-detail__value">{tailwind_value}</div>
            </div>
            <div className="humidity-detail">
                {/* <img className="humidity-icon" alt="Humidity" src={humidityIcon} /> */}
                <div className="weather-detail__label">Humidity</div>
                <div className="weather-detail__value">{humidity_value}</div>
            </div>
            <div className="visibility-detail">
                {/* <img className="visibility-icon" alt="Visibility" src={visibilityIcon} /> */}
                <div className="weather-detail__label">Visibility</div>
                <div className="weather-detail__value">{visibility_value}</div>
            </div>
        </div>
    )
};

const runningCondition = (current_condition) =>{
    if (current_condition === 'Mostly cloudy') {
        return 'Good';
    } else if (current_condition === 'Rainy') {
        return 'Bad';
    } else {
        return 'Unknown';
    }
}


export function WeatherCard() {
    return (
        <div className="weather-card">
            <div className="location">{currentLocation(weatherData)}</div>
            <div className = "weather-card_main">
                {currentWeather(weatherData)}
                {weatherDetails(weatherData)}
                <div className="running-condition">Running Condition: {runningCondition(weatherData)}</div>
            </div>
        </div>
    )
};