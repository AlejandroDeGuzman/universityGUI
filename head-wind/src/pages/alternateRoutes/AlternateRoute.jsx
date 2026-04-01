import { useEffect, useState } from 'react'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap,
} from "@vis.gl/react-google-maps";
import "./AlternateRoute.css";
import { fetch24HourWeatherDataPoints } from "../../api/weatherAPI";
import { convertTemp } from '../../utils/temperature';

const ORIGIN = { lat: 51.5074, lng: -0.1278 };
const DESTINATION = { lat: 51.5154, lng: -0.0722 };

function geocodeToPostcode(postcode) {
    return new Promise((resolve, reject) => {
        if (!window.google) {
            reject(new Error("Google maps has not loaded in yet"));
            return;
        }
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: postcode, region: "uk" }, (results, status) => {
            if (status === "OK" && results[0]) {
                const location = results[0].geometry.location;
                resolve({
                    lat: location.lat(),
                    lng: location.lng(),
                });
            } else {
                reject(new Error(`Could not find postcode: ${postcode}`));
            }
        })
    })
}



// Header component
const AltRouteHeader = () => {
    return (
        <h1>Alternate Routes</h1>
    )
}


// Route selection sidebar component
const RouteSideBar = ({ routes, selectedRouteIndex, onSelectedRoute, weather }) => {
    const getWeatherTags = (route, index) => {
        // weather condition badge
        const tags = [];

        if (!weather) return tags;

        const { temp, rain, wind, uv } = weather;
        // console.log("weather values:", { temp, rain, wind, uv });
        const isFastest = index === 0; // Google maps returns the fastest route first 

        //// rain logic ////
        if (rain > 30) { // heavy rain
            if (isFastest) tags.push("Minimise rain exposure 🌧️"); // less exposure to heavy rain if the fastest route is chosen
            else if (index === 1) tags.push("Potentially Sheltered ☂️"); // if the route is not the fastest, the alternate route may have more shelter from rain
        } else if (rain > 15 && rain <= 50) { // moderate rain
            if (isFastest) tags.push("Minimise rain exposure 🌧️"); // less exposure to moderate rain if fastest route is chosen
        }

        //// heat + uv logic ////
        if (temp > 22 || uv >= 4) { // high temp and UV index
            if (isFastest) tags.push("Minimise sun exposure ☀️"); // less exposure to sun if the fastest route is chosen
            if (index === 1) tags.push("Maximised shade 🌳"); // alternate route may have more shade
        }

        //// coldness logic ////
        if (temp < 8) {
            if (isFastest) tags.push("Minimal cold exposure ❄️"); // less exposure to cold if the fastest route is chosen
            if (index > 0) tags.push("Colder route 🏃‍♀️"); // longer route so more exposure to cold
        }

        //// headwind logic ////
        if (wind > 15) {
            if (index === 1) tags.push("Sheltered choice 🏢"); // alternate route is more sheltered
        }
        return tags;
    };

    const minDistance = Math.min(...routes.map(r => r.distanceMeters));
    const getRouteBadge = (route, index) => {
        if (index === 0) return "Best";
        if (route.distanceMeters === minDistance) return "Shortest";
    };

    return (
        <>
            {routes.map((route, index) => {
                const weatherTags = getWeatherTags(route, index);

                return (
                    <div
                        key={index}
                        className={`route_card ${selectedRouteIndex === index ? "active_route" : ""
                            }`}
                        onClick={() => onSelectedRoute(index)}
                    >
                        <div className="route_header">
                            <div className="route_header_left">

                                <div className="route_meta_info">
                                    {getRouteBadge(route, index) && (
                                        <span className="route_badge">{getRouteBadge(route, index)}</span>
                                    )}
                                    <p className="route_name">Route {index + 1}</p>
                                    <div className="route_details">
                                        <span>{route.distanceKm} km</span>
                                        <span className="details_divider">·</span>
                                        <span>{route.durationText}</span>
                                    </div>
                                </div>


                                <div className="route_weather_badge">
                                    {weatherTags.map((tag, i) => (
                                        <span key={i} className="weather_badge">{tag}</span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </>
    );
};


const RouteLines = ({ routes, selectedRouteIndex, onRouteClick }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !window.google || !routes.length) return;

        const bounds = new window.google.maps.LatLngBounds();
        const polylines = [];
        routes.forEach((route, index) => {
            const path = window.google.maps.geometry.encoding.decodePath(route.polyline);

            path.forEach((point) => bounds.extend(point));
            //change this part to make the map look
            const polyline = new window.google.maps.Polyline({
                path,
                map,
                strokeOpacity: index === selectedRouteIndex ? 1 : 0.45,
                strokeWeight: index === selectedRouteIndex ? 6 : 4,
                clickable: true,
            });
            polyline.addListener("click", () => onRouteClick(index));
            polylines.push(polyline);
        });
        if (!bounds.isEmpty()) {
            map.fitBounds(bounds, 60);
        }
        return () => {
            polylines.forEach((polyline) => polyline.setMap(null));
        };
    }, [map, routes, selectedRouteIndex, onRouteClick]);

    return null;
};


// route map component
const RouteMap = ({ routes, selectedRouteIndex, onRouteClick, originCoords, destCoords }) => {
    const selectedRoute = routes[selectedRouteIndex];
    return (
        <div className="route_map">
            <div className="map_header">
                <div className="selected_route">Route {selectedRouteIndex + 1}</div>
                <div className="timeStamp">{selectedRoute ? selectedRoute.durationText : "00:00:00"}</div>
            </div>
            <div className="map_canvas_wrapper">
                <Map
                    center={originCoords}
                    zoom={13}
                    mapId="DEMO_MAP_ID"
                    gestureHandling="greedy"
                    style={{ width: "100%", height: "100%" }}
                >
                    <AdvancedMarker position={originCoords} title="Start" />
                    <AdvancedMarker position={destCoords} title="Destination" />
                    <RouteLines
                        routes={routes}
                        selectedRouteIndex={selectedRouteIndex}
                        onRouteClick={onRouteClick}
                    />
                </Map>
            </div>
        </div>


    );
};


//convert seconds to minutes//
function formatDuration(durationString) {
    const seconds = Number(String(durationString).replace("s", ""));
    const minutes = Math.round(seconds / 60);

    if (minutes < 60) return `${minutes} mins`;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes} mins`;
}

async function getRoutes(origin, destination) {
    const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": import.meta.env.VITE_MAPS_KEY,
                "X-Goog-FieldMask":
                    "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline,routes.routeLabels",
            },
            body: JSON.stringify({
                origin: {
                    location: {
                        latLng: {
                            latitude: origin.lat,
                            longitude: origin.lng,
                        },
                    },
                },
                destination: {
                    location: {
                        latLng: {
                            latitude: destination.lat,
                            longitude: destination.lng,
                        },
                    },
                },
                travelMode: "WALK",
                computeAlternativeRoutes: true,
                languageCode: "en-GB",
                units: "METRIC",
            }),
        }
    );
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Map routing API error: ${response.status} ${errorText}`);
    }
    return response.json();
}


const WeatherSummary = ({ weather, unit }) => {
    if (!weather) return null;
    const temperature = Math.round(convertTemp(weather.temp, unit)) + '°' + unit;

    return (
        <div className="weather_summary">
            <div className="weather_item">
                <span className="label">🌡️ Temp</span>
                <span className="value">{temperature}</span>
            </div>
            <div className="weather_item">
                <span className="label">🌧️ Rain</span>
                <span className="value">{weather.rain}%</span>
            </div>
            <div className="weather_item">
                <span className="label">💨 Wind</span>
                <span className="value">{weather.wind} km/h</span>
            </div>
            <div className="weather_item">
                <span className="label">☀️ UV</span>
                <span className="value">{weather.uv}</span>
            </div>
        </div>
    );
};


// MAIN COMPONENT RENDERING //
const AlternateRoute = ({ unit }) => {
    // routes calculated 
    const [routes, setRoutes] = useState([]);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    // weather 
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState("");
    //postcode
    const [startPostcode, setStartPostcode] = useState("");
    const [endPostcode, setEndPostcode] = useState("");
    const [originCoords, setOriginCoords] = useState(ORIGIN);
    const [destCoords, setDestCoords] = useState(DESTINATION);


    useEffect(() => {
        async function loadDefaultRoute() {
            try {
                setLoading(true);
                setError("");
                const data = await getRoutes(ORIGIN, DESTINATION);

                const formattedRoutes = (data.routes || []).map((route) => ({
                    distanceMeters: route.distanceMeters,
                    distanceKm: (route.distanceMeters / 1000).toFixed(2),
                    durationText: formatDuration(route.duration),
                    polyline: route.polyline.encodedPolyline,
                    labels: route.routeLabels || [],
                }));

                setRoutes(formattedRoutes);
                setSelectedRouteIndex(0);
                const weather = await fetch24HourWeatherDataPoints(ORIGIN.lat, ORIGIN.lng);
                setWeatherData(weather);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadDefaultRoute();
    }, []);

    async function handleFindRoutes() {
        try {
            setLoading(true);
            setError("");
            const origin = await geocodeToPostcode(startPostcode);
            const destination = await geocodeToPostcode(endPostcode);
            setOriginCoords(origin);
            setDestCoords(destination);
            const data = await getRoutes(origin, destination);

            const formattedRoutes = (data.routes || []).map((route) => ({
                distanceMeters: route.distanceMeters,
                distanceKm: (route.distanceMeters / 1000).toFixed(2),
                durationText: formatDuration(route.duration),
                polyline: route.polyline.encodedPolyline,
                labels: route.routeLabels || [],
            }));

            setRoutes(formattedRoutes);
            setSelectedRouteIndex(0);
            const weather = await fetch24HourWeatherDataPoints(origin.lat, origin.lng);
            setWeatherData(weather);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        async function loadWeather() {
            try {
                const data = await fetch24HourWeatherDataPoints(ORIGIN.lat, ORIGIN.lng);
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            }
        }
        loadWeather();
    }, []);

    const currentWeather = weatherData[new Date().getHours()] || null;

    return (
        <APIProvider
            apiKey={import.meta.env.VITE_MAPS_KEY}
            libraries={["geometry", "marker"]}
        >
            <div className="alternate_route_container">
                <div className="altroute-title">
                    < AltRouteHeader />
                </div>
                <div className="postcode_form">
                    <input
                        type="text"
                        placeholder="Enter starting postcode"
                        value={startPostcode}
                        onChange={(e) => setStartPostcode(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Destination postcode"
                        value={endPostcode}
                        onChange={(e) => setEndPostcode(e.target.value)}
                    />
                    <button onClick={handleFindRoutes}>Find Routes</button>
                </div>
                <WeatherSummary weather={currentWeather} unit={unit} />
                <div className="routes_container">
                    {loading && <p>Loading routes...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && routes.length > 0 && (
                        <RouteSideBar
                            routes={routes}
                            selectedRouteIndex={selectedRouteIndex}
                            onSelectedRoute={setSelectedRouteIndex}
                            weather={currentWeather}
                        />
                    )}
                </div>
                <div className="map_placeholder_container">
                    {!loading && !error && routes.length > 0 && (
                        <RouteMap
                            routes={routes}
                            selectedRouteIndex={selectedRouteIndex}
                            onRouteClick={setSelectedRouteIndex}
                            originCoords={originCoords}
                            destCoords={destCoords}
                        />
                    )}
                </div>
            </div>
        </APIProvider>

    );
}

export default AlternateRoute;
