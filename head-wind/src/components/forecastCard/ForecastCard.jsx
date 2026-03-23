import "./ForecastCard.css";
import humidityIcon from "../../assets/humidity.png";
import headwindIcon from "../../assets/windspeed.png";


const DIFFICULTY = {
  Poor: { color: "#f50303" },
  Challenging: { color: "#ff8c00" },
  Moderate: { color: "#005eff" },
  Good: { color: "#00ff04" }
};

const placeholderData = {
  forecast_time: 'Current',
  forecast_temp: '7°',
  condition: 'Poor',
  humidity: '85%',
  wind: '10 km/h',
  wind_type: 'head'
}

export const ForecastCardItem = ({ forecast_Data }) => {
  return (
    <div className="forecast-card-item">
      <div className="forecast_time">{forecast_Data.forecast_time}</div>
      <div className="forecast_temp">{forecast_Data.forecast_temp}</div>
      <div className="image-text">
        <div className="difficulty-dot"style={{ backgroundColor: DIFFICULTY[forecast_Data.condition]?.color }}     />
        <div className="forecast_condition">  {forecast_Data.condition}</div>
      </div>
      <div className="image-text">
        <img src={humidityIcon} className="image humidity_icon" />
        <div className="forecast_humidity">{forecast_Data.humidity}</div>
      </div>
      <div className="image-text">
        <img src={headwindIcon} className="image" />
        <div className="forecast_wind">{forecast_Data.wind}</div>
      </div>

    </div>
  )
}

export function ForecastCard() {
  return (
    
    <div className="forecast-card">
      <br />
      <hr className="divider" />
      <br />
      <div className="forecast-header">Hourly Forecast</div>
      <div className="forecast-card_main">
        <ForecastCardItem forecast_Data={placeholderData} />
        <ForecastCardItem forecast_Data={placeholderData} />
        <ForecastCardItem forecast_Data={placeholderData} />
        <ForecastCardItem forecast_Data={placeholderData} />
        <ForecastCardItem forecast_Data={placeholderData} />
      </div>
      <br />
      <br />
      <hr className="divider"/>
      <br />
    </div>
  )
}

export default ForecastCard; 
