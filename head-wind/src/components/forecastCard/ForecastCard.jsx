import { fetchLatitudeLongitude, fetch7DayWeather, getWeatherCondition } from "../../api/weatherAPI";
import { useState, useEffect } from "react";
import humidityIcon from "../../assets/humidity.png";
import headwindIcon from "../../assets/windspeed.png";
import "./ForecastCard.css";
import { convertTemp } from "../../utils/temperature";

// colour code for difficulty for running
const DIFFICULTY = {
    Clear: { color: "#8cee8d" },
    "Partly Cloudy": { color: "#00ff04" },
    Overcast: { color: "#399da4" },
    Drizzle: { color: "#4fc6d8" },
    Rainy: { color: "#58b7dd" },
    Showers: { color: "#ffd83c" },
    Thunderstorm: { color: "#d53333" },
    Snowy: { color: "#93b6f1" },
    Foggy: { color: "#ecbf89" },
};




// individual forecast temperature 
export const ForecastCardItem = ({ forecast_Data, unit }) => {
    const condition = getWeatherCondition(forecast_Data.weatherCode);
    const forecastTemps = {
        low : Math.round(convertTemp(forecast_Data.min_temp, unit)),
        avg : Math.round(convertTemp(forecast_Data.avg_temp, unit )),
        high : Math.round(convertTemp(forecast_Data.max_temp, unit))
        };

    return (
        <div className="forecast-card-item">
            <div className="forecast_time">{forecast_Data.forecast_time}</div>
            <div className="forecast_temp">
                <div className="forecast_low">{forecastTemps.low + '°'}</div>
                <div className="forecast_avg">{forecastTemps.avg + '°'}</div>
                <div className="forecast_high">{forecastTemps.high + '°'}</div>
            </div>
            <div className="image-text">
                <div className="difficulty-dot" style={{ backgroundColor: DIFFICULTY[condition]?.color }} />
                <div className="forecast_condition">  {condition}</div>
            </div>
            <div className="image-text">
                <img src={humidityIcon} className="image humidity_icon" />
                <div className="forecast_humidity">{forecast_Data.rain}</div>
            </div>
            <div className="image-text">
                <img src={headwindIcon} className="image" />
                <div className="forecast_wind">{forecast_Data.wind}</div>
            </div>
        </div>
    )
}

export function ForecastCard({ postcode , unit}) {
    const [latLongData, setLatLongData] = useState(null);
    const [forecast, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getForecast = async () => {
            try {
                const latLongData = await fetchLatitudeLongitude(postcode);
                const forecast = await fetch7DayWeather(latLongData.lat, latLongData.lon);
                setLatLongData(latLongData);
                setForecastData(forecast);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        getForecast();

    }, [postcode]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="forecast-card">
            <hr className="divider" />
            <div className="forecast-header">Daily Forecast</div>
            <div className="forecast-card_main">
                {forecast.map((day, i) => (
                    <ForecastCardItem key={i} forecast_Data={day} unit={unit} />
                ))}
            </div>
            <br />
            <hr className="divider" />
        </div>
    )
}

export default ForecastCard; 
