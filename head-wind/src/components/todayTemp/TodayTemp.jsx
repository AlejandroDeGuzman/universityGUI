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

export function TodayTemp({ postcode }) {
    const [latLongData, setLatLongData] = useState(null);
    const [weatherAPIData, setWeatherAPIData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weatherDataPoints, setWeatherDataPoints] = useState([]);

    useEffect(() => {
        const getBasicWeatherData = async () => {
            try {
                setError(null);
                setLoading(true);

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

    }, [postcode]);

    if (loading) return <p>Loading...</p>;
    /*if (error) return <p>Error: {error.message}</p>;*/
    if (error) return null;

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
            <div className="today-temp-card">
                <div className="weather-meta">
                    <span>{"Humidity: " + weatherAPIData.humidity + "%"}</span>
                    <span>{"Wind Speed: " + weatherAPIData.windSpeed + "m/s"}</span>
                </div>

                <div className="temperature-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyTemps} margin={{ top: 80, right: 20, left: 0, bottom: 10 }}>
                            
                            <XAxis
                                dataKey="time"
                                stroke="#ffffff"
                                orientation="top"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={10}
                                interval={0}
                                ticks={hourlyTemps
                                    .filter((_, index) => index % 2 === 0)
                                    .map((point) => point.time)}
                            />
                            <YAxis
                                stroke="#ffffff"
                                domain={[domainMin, domainMax]}
                                ticks={[Math.round(minTemp), Math.round(midTemp), Math.round(maxTemp)]}
                                tickFormatter={(value) => `${value}°`}
                            />

                            <Tooltip
                                cursor={false}
                                contentStyle={{
                                    backgroundColor: "rgba(40,40,40,0.9)",
                                    border: "none",
                                    borderRadius: "10px",
                                    color: "white"
                                }}
                                labelStyle={{ color: "#aaa" }}
                            />
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
                                strokeWidth={4}
                                dot={{ r: 5 }}
                                activeDot={{ r: 8 }}
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
