import { useEffect, useState } from 'react'
import './App.css'
import backgroundImage from "./assets/background.png";
import { WeatherCard } from "./components/weatherCard/WeatherCard";
import Header from './components/headerNavBar/Header';
import TodayTemp from './components/todayTemp/TodayTemp';
import ForecastCard from "./components/forecastCard/ForecastCard";
import LocationCard from "./components/locationCard/locationCard";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlternateRoute from './AlternateRoute';

function App() {
    const background = {
      backgroundImage: `linear-gradient(rgba(14, 29, 46, 0.75)), url(${backgroundImage})`,
      backgroundSize: 'cover',
    };

    const [postcode, setPostcode] = useState(() => {
        return localStorage.getItem("postcode") || "E14";
    });

    useEffect(() => {
        localStorage.setItem("postcode", postcode);
    }, [postcode]);

    return (
        <BrowserRouter>
            <div style={background}>
                <Header setPostcode={setPostcode} />
                <Routes>
                    <Route path="/" element={
                        <>
                            <WeatherCard postcode={postcode} />
                            <ForecastCard postcode={postcode} />
                            <TodayTemp postcode={postcode} />
                            <LocationCard setPostcode={setPostcode} />
                        </>
                    }
                    />
                    <Route path="/test-page" element={<AlternateRoute />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App
