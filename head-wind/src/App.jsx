import { useEffect, useState } from 'react'
import './App.css'
import { WeatherCard } from "./components/weatherCard/WeatherCard";
import Header from './components/headerNavBar/Header';
import TodayTemp from './components/todayTemp/TodayTemp';


// testing weatherAPI.jsx
import { fetchLatitudeLongitude } from './api/weatherAPI';

/* testing react router */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlternateRoute from './AlternateRoute';


function App() {
    const [latLongData, setLatLongData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLatLongData = async () => {
            try {
                const latLongData = await fetchLatitudeLongitude("E14");
                setLatLongData(latLongData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getLatLongData();

    }, []);


    if (error) return <p>Error: {error.message}</p>;

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={
                        <>
                            <WeatherCard />
                            <TodayTemp />
                            {!loading && !error ? (
                                <>
                                    <p>City: {latLongData.name}</p>
                                    <p>Latitude: {latLongData.lat}</p>
                                    <p>Longitude: {latLongData.lon}</p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
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
