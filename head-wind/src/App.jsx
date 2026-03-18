import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import headwindIcon from "./assets/headwind_icon.png";
import './App.css'
import { WeatherCard } from "./WeatherCard";
import { ForecastCard } from './ForecastCard';

function App() {
  const [count, setCount] = useState(0)

  // Header bar //
  const navigation = () => {
    return (
      <div className = 'header'>
        <div className='rectangle'>
          <h1>Headwind</h1>
        </div>
      </div>
    )
  };


  return (
    <div>
      {navigation()}
      {WeatherCard()}
      <br />
      <hr></hr>
      <br />
      {ForecastCard()}
    </div>
  );
}

export default App
