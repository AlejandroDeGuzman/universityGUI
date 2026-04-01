import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/headerNavBar/Header';
import Background from './components/background/Background';

import Home from './pages/home/Home';
import AlternateRoute from './pages/alternateRoutes/AlternateRoute';

function App() {
    const [postcode, setPostcode] = useState(() => {
        return localStorage.getItem("postcode") || "E14";
    });
    const [unit, setUnit] = useState("C")

    useEffect(() => {
        localStorage.setItem("postcode", postcode);
    }, [postcode]);


    return (
        <BrowserRouter>
            <Background>
                <Header unit={unit} setUnit={setUnit}/>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                postcode={postcode}
                                setPostcode={setPostcode}
                                unit={unit}
                                setUnit={setUnit}
                            />
                        }
                    />

                    <Route
                        path="/alternate-routes"
                        element={<AlternateRoute unit={unit}/>}
                    />
                </Routes>

            </Background>
        </BrowserRouter>
    );
}

export default App;
