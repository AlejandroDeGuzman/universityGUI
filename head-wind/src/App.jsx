import { useEffect, useState } from 'react'
import './App.css'
import backgroundImage from "./assets/background.png";
import { WeatherCard } from "./components/weatherCard/WeatherCard";
import Header from './components/headerNavBar/Header';
import TodayTemp from './components/todayTemp/TodayTemp';
import ForecastCard from "./components/forecastCard/ForecastCard";
import Background from './components/background/Background';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlternateRoute from './AlternateRoute';

function App() {
    const [postcode, setPostcode] = useState(() => {
        return localStorage.getItem("postcode") || "E14";
    });

    useEffect(() => {
        localStorage.setItem("postcode", postcode);
    }, [postcode]);

    return (
        <BrowserRouter>
            <Background>
                <Header setPostcode={setPostcode} />
                <Routes>
                    <Route path="/" element={
                        <>
                            <WeatherCard postcode={postcode} setPostcode={setPostcode} />
                            <ForecastCard postcode={postcode} />
                            <TodayTemp postcode={postcode} />
                        </>
                    }
                    />
                    <Route path="/test-page" element={<AlternateRoute />} />
                </Routes>
            </Background>
        </BrowserRouter>
    );
}

export default App
