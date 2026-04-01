import { useState, useEffect } from "react";
import "./TodayTemp.css";
import { fetchLatitudeLongitude, fetchWeatherData, fetch24HourWeatherDataPoints } from "../../api/weatherAPI";
import { RunningCondition } from "../weatherCard/WeatherCard";
import {
    ResponsiveContainer,
    Line,
    XAxis,
    YAxis,
    AreaChart,
    Area,
    Tooltip,
} from "recharts";
import { convertTemp } from "../../utils/temperature";


// shows weather details when hovered over data points on the graph 
const ToolTipDetail = ({ active, payload, unit }) => {
    if (!active || !payload?.length)
        return null;
    const d = payload[0].payload;

    return (
        <div style={{ background: "rgba(40,40,40,0.9)", borderRadius: 10, padding: 10, color: "white" }}>
            <p>🌡️ {d.temp + "°" + unit} </p>
            <p>🌧️ Rain chance: {d.rain}%</p>
            <p>💨 Wind (avg): {d.wind} km/h</p>
            <p>☀️ UV: {d.uv}</p>
        </div>
    )
}

const CustomizedDot = (props) => {
    const { cx, cy, payload } = props;

    // import logic from WeatherCard
    const condition = RunningCondition( 
        payload.rawTemp ?? payload.temp,
        payload.wind, 
        payload.visibility || 10000, 
        payload.condition || ""
    );

    return (
        <circle 
            cx={cx} 
            cy={cy} 
            r={4} 
            fill={condition.color} 
            stroke="white" 
            strokeWidth={2}
        />
    );
};

const GraphLegend = () => {
    return (
        <div className="graph_legend">
                <div className="legend_item">
                    <span className="legend_dot" style={{ backgroundColor: "rgb(183, 255, 89)" }}></span>
                    <span>Excellent</span>
                </div>
                <div className="legend_item">
                    <span className="legend_dot" style={{ backgroundColor: "#ffd519" }}></span>
                    <span>Good</span>
                </div> 
                <div className="legend_item">
                    <span className="legend_dot" style={{ backgroundColor: "rgb(237, 122, 21)" }}></span>
                    <span>Moderate</span>
                </div>
                <div className="legend_item">
                    <span className="legend_dot" style={{ backgroundColor: "rgb(225, 74, 74)" }}></span>
                    <span>Poor</span>
                </div> 
        </div>
    )
}

export function TodayTemp({ postcode , unit}) {
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

    }, [postcode]); //refresh data if user changes postcode

    if (loading) return <p>Loading...</p>;
    if (error) return null;

    const displayTemps = weatherDataPoints.map((d) => ({
        ...d,
        rawTemp: d.temp,
        temp: Math.round(convertTemp(d.temp, unit)),
    }));

    const temps = displayTemps.map((d) => d.temp);

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const midTemp = Math.round((minTemp + maxTemp) / 2);
    const padding = 2;

    const domainMin = minTemp - padding;
    const domainMax = maxTemp + padding;
    const hourlyTemps = displayTemps;

    return (
        <div className="today-temp-section">
            <h1>Today's Temperature</h1>
            <div className="today-temp-card">
                <div className="weather-meta">
                    <span>{"Current Humidity: " + weatherAPIData.humidity + "%"}</span>
                    <GraphLegend />
                </div>

                <div className="temperature-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyTemps} margin={{ top: 80, right: 20, left: 0, bottom: 10 }}>

                            <XAxis
                                dataKey="time"
                                stroke="#2a4457"
                                orientation="top"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={10}
                                minTickGap={25}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                stroke="#2a4457"
                                domain={[domainMin, domainMax]}
                                ticks={[minTemp, midTemp, maxTemp]}
                                tickFormatter={(value) => `${value}°`}
                            />

                            <Tooltip content={<ToolTipDetail unit={unit} />} cursor={false} />

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
                                dot={<CustomizedDot />}
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="temperature-footer">
                    <span>Low <span className="temp-value">{minTemp}°{unit}</span></span>
                    <span>High <span className="temp-value">{maxTemp}°{unit}</span></span>
                    <span>Feels like <span className="temp-value">{Math.round(convertTemp(weatherAPIData.feelsLikeTemp, unit))}°{unit}</span></span>
                </div>
            </div>
        </div>
    );
}

export default TodayTemp
