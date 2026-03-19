import {Link} from "react-router-dom";
import headwindIcon from "../../assets/headwind.png";
import tailwindIcon from "../../assets/tailwind.png";
import humidityIcon from "../../assets/humidity.png";
import visibilityIcon from "../../assets/visibility.png";
import locationIcon from "../../assets/location_icon.png";
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
 

// current location section
const currentLocation = ({current_location}) => {
    return (
        <>
            <img className="location-icon" alt="Location" src={locationIcon} />
            {current_location}
        </>
    )
};


// current temperature and feels-like section
const currentWeather = ({current_weather, current_condition, feels_like_value}) => {
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
const weatherDetails = ({headwind_value, tailwind_value, humidity_value, visibility_value}) => {
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
                <div className="weather-detail__value">{visibility_value}</div>
            </div>
        </div>
    )
};

// to be modified 
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
            <div className="location">
                {/* <img className="location-icon" alt="Location" src={locationIcon} /> */}
                {currentLocation(weatherData)}
                </div>
            <div className = "weather-card_main">
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
            <Link className="explore-alternate-routes" to="/test-page">Explore alternate routes</Link>
        </div>
    )
};

export default WeatherCard;