import { useEffect, useState } from 'react'
import './App.css'
import { WeatherCard } from "./components/weatherCard/WeatherCard";
import Header from './components/headerNavBar/Header';
import TodayTemp from './components/todayTemp/TodayTemp';
import ForecastCard from "./components/forecastCard/ForecastCard";
import LocationCard from "./components/locationCard/locationCard";

/* testing react router */
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
            <div>
                <Header setPostcode={setPostcode} />
                <p style={{ color: "white" }}>Current postcode: {postcode}</p>

                <Routes>
                    <Route path="/" element={
                        <>
                            <WeatherCard postcode={postcode} />
                            <ForecastCard />
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
