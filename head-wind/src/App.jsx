import { useState } from 'react'
import headwindIcon from "./assets/headwind_icon.png";
import './App.css'
// import { WeatherCard } from "./WeatherCard";
import ForecastCard from './components/forecastCard/ForecastCard';
import Header from './components/headerNavBar/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <ForecastCard />
    </div>
  );
}

export default App
