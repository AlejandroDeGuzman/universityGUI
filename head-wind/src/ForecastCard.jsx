import "./ForecastCard.css";

const DIFFICULTY = {
  poor : {color : "#f50303"},
  challenging : {color : "#ff8c00"},
  moderate : {color : "#005eff"},
  good : {color :"#00ff04"}
};

const placeholderData = {
    forecast_time : 'Current',
    forecast_temp : '7°',
    condition : 'poor',
    humidity : '85%',
    wind : '10 km/h',
    wind_type : 'head'
}

const ForecastCardItem = ({forecast_Data}) => {
    return (
        <div className="forecast-card-item">
            <div className="forecast_time">{forecast_Data.forecast_time}</div>
            <div className="forecast_temp">{forecast_Data.forecast_temp}</div>
            <div className="forecast_condition">{forecast_Data.condition}</div>
            <div className="forecast_humidity">{forecast_Data.humidity}</div>
            <div className="forecast_wind">{forecast_Data.wind}</div>
            
        </div>
    )
}

export function ForecastCard() {
    return (
        <div className="forecast-card">
            <div className="forecast-header">Hourly Forecast</div>
            <div className="forecast-card_main">
                <ForecastCardItem forecast_Data={placeholderData} />
                <ForecastCardItem forecast_Data={placeholderData} />
                <ForecastCardItem forecast_Data={placeholderData} />
                <ForecastCardItem forecast_Data={placeholderData} />
                <ForecastCardItem forecast_Data={placeholderData} />
            </div>
            <button className="alt-route">Explore alternate routes</button>
        </div>
    )
}