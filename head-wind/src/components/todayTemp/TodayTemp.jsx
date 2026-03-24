import "./TodayTemp.css";
import { fetchLatitudeLongitude, fetchWeatherData, fetch24HourWeatherDataPoints } from "../../api/weatherAPI";
import { useState, useEffect } from "react";
import {
    ResponsiveContainer,
    Line,
    XAxis,
    YAxis,
    AreaChart,
    Area,
    Tooltip,
} from "recharts";

// shows weather details when hovered over data points on the graph 
const ToolTipDetail = ({ active, payload, label}) => {
    if (!active || !payload?.length)
        return null;
    const d = payload[0].payload;

    return (
        <div style={{ background: "rgba(40,40,40,0.9)", borderRadius: 10, padding: 10, color: "white" }}>
            <p>🌡️ {d.temp}°C</p>
            <p>🌧️ Rain chance: {d.rain}%</p>
            <p>💨 Wind: {d.wind} km/h</p>
            <p>☀️ UV: {d.uv}</p>
        </div> 
    )
}

export function TodayTemp({ postcode }) {
    const [latLongData, setLatLongData] = useState(null);
    const [weatherAPIData, setWeatherAPIData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weatherDataPoints, setWeatherDataPoints] = useState([]);

    useEffect(() => {
        const getBasicWeatherData = async () => {
            try {
                const latLongData = await fetchLatitudeLongitude(postcode);
                const weatherAPIData = await fetchWeatherData(latLongData.lat, latLongData.lon);
                const weatherDataPoints = await fetch24HourWeatherDataPoints(latLongData.lat, latLongData.lon);
                setLatLongData(latLongData);
                setWeatherAPIData(weatherAPIData);
                setWeatherDataPoints(weatherDataPoints);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getBasicWeatherData();

    }, [postcode]); //refresh data if user changes postcode

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const temps = weatherDataPoints.map(d => d.temp);

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const midTemp = Math.round((minTemp + maxTemp) / 2);
    const padding = 2;

    const domainMin = minTemp - padding;
    const domainMax = maxTemp + padding;
    const hourlyTemps = weatherDataPoints;

    return (
        <div className="today-temp-section">
            <h1>Today's Temperature</h1>
            <div className="today-temp-card">
                <div className="weather-meta">
                    <span>{"Humidity: " + weatherAPIData.humidity + "%"}</span>
                    <span>{"Wind Speed: " + weatherAPIData.windSpeed + "m/s"}</span>
                </div>

                <div className="temperature-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyTemps} margin={{ top: 80, right: 20, left: 0, bottom: 10 }}>
                            <XAxis dataKey="time" stroke="#ffffff" orientation="top" axisLine={false} tickLine={false} />
                            <YAxis
                                stroke="#ffffff"
                                domain={[domainMin, domainMax]}
                                ticks={[Math.round(minTemp), Math.round(midTemp), Math.round(maxTemp)]}
                                tickFormatter={(value) => `${value}°`}
                            />

                            <Tooltip content={<ToolTipDetail />} cursor={false} /> 

                            <Area
                                type="monotone"
                                dataKey="temp"
                                stroke="#58bfff"
                                fill="#58bfff"
                                fillOpacity={0.25}
                                tooltipType="none"
                            />
                            <Line
                                type="monotone"
                                dataKey="temp"
                                stroke="#58bfff"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="temperature-footer">
                    <span>Low <span className="temp-value">{minTemp + "°C"}</span></span>
                    <span>High <span className="temp-value">{maxTemp + "°C"}</span></span>
                    <span>Feels like <span className="temp-value">{Math.round(weatherAPIData.feelsLikeTemp) + "°C"}</span></span>
                </div>
            </div>
        </div>
    );
}

export default TodayTemp
