import { useEffect, useState } from 'react'
import './App.css'
import { WeatherCard } from "./components/weatherCard/WeatherCard";
import Header from './components/headerNavBar/Header';
import TodayTemp from './components/todayTemp/TodayTemp';
import ForecastCard from "./components/forecastCard/ForecastCard"

/* testing react router */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlternateRoute from './AlternateRoute';

function App() {
    const [postcode, setPostcode] = useState("E14");

    return (
        <BrowserRouter>
            <div>
                <Header setPostcode={setPostcode} />
                <Routes>
                    <Route path="/" element={
                        <>
                            <WeatherCard postcode={postcode} />
                            {/* <ForecastCard /> */}
                            {/* <TodayTemp postcode={postcode} /> */}
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
