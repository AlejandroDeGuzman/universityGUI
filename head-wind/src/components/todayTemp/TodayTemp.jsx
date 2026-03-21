import "./TodayTemp.css";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    AreaChart,
    Area,
    Tooltip,
  } from "recharts";

const hourlyTemps = [
    {time: "12am", temp: 7},
    { time: "4AM", temp: 6 },
  { time: "8AM", temp: 5 },
  { time: "NOW", temp: 10 },
  { time: "12PM", temp: 11 },
  { time: "4PM", temp: 10 },
  { time: "8PM", temp: 6 },
  { time: "11PM", temp: 2 },
];

const temps = hourlyTemps.map((d) => d.temp);

const minTemp = Math.min(...temps);
const maxTemp = Math.max(...temps);
const midTemp = Math.round((minTemp + maxTemp) / 2);


function TodayTemp() {
  return (
    <div className="today-temp-section">
      <h1 className="today-temp-title">Today's Temperature</h1>
      <div className="today-temp-card">
        <div className="today-temp-summary">
            <span className="now-label">Now</span>
            <span className="current-temp">10°C</span>
        </div>
        <div className="weather-meta">
                <span>85% humiditiy</span>
                <span>10 km/h wind</span>
        </div>

        <div className="temperature-chart">
            <ResponsiveContainer wdith="100%" height="100%">
                <AreaChart data={hourlyTemps} margin={{ top: 80, right: 20, left: 0, bottom: 10 }}>
                    <XAxis dataKey="time" stroke="#ffffff" orientation="top" axisLine={false} tickLine={false}/>
                    <YAxis 
                        stroke="#ffffff" 
                        domain={["dataMin-3","dataMax+3"]} 
                        axisLine={false} tickLine={false} 
                        ticks={[minTemp,midTemp, maxTemp]} 
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
                        dot={{r:5}}
                        activeDot={{r:8}}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className="temperature-footer">
            <span>Low <span className="temp-value">2°C</span></span>
            <span>High <span className="temp-value">11°C</span></span>
            <span>Feels like <span className="temp-value">7°C</span></span>
        </div>
      </div>
    </div>
  );
}

export default TodayTemp