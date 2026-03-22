import { useState } from 'react'
import headwindIcon from "./assets/headwind_icon.png";
import './App.css'
import { WeatherCard } from "./components/weatherCard/WeatherCard";
import Header from './components/headerNavBar/Header';
import TodayTemp from './components/todayTemp/TodayTemp';


function App() {
  const [count, setCount] = useState(0)


  return (
    <div>
      <Header />
      <WeatherCard />
      <TodayTemp />
    </div>
  );
}

export default App
