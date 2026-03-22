import { useState } from 'react'
import './App.css'
import { WeatherCard } from "./components/weatherCard/WeatherCard";
import Header from './components/headerNavBar/Header';
import TodayTemp from './components/todayTemp/TodayTemp';



/* testing react router */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlternateRoute from './AlternateRoute';


function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<WeatherCard />} />
                    <Route path="/test-page" element={<AlternateRoute />} />
                </Routes>
            </div>
        </BrowserRouter>
        // <div>
        //   <Header />
        //   <WeatherCard />
        //   <TodayTemp />
        // </div>
    );
}

export default App
