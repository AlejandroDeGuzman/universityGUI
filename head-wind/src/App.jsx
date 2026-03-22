import { useState } from 'react'
import './App.css'
import { WeatherCard } from "./components/weatherCard/WeatherCard";
import Header from './components/headerNavBar/Header';
import TodayTemp from './components/todayTemp/TodayTemp';
import ForecastCard from "./components/forecastCard/ForecastCard"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <WeatherCard />
      <ForecastCard/>
      <TodayTemp />
    </div>
  );
}

export default App
