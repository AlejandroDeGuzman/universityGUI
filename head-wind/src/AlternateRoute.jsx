import { useEffect, useState, useMemo} from 'react'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap,
} from "@vis.gl/react-google-maps";
import startButton from "./assets/start_button.png";
import "./altRouteMain.css";

//example coordinates, change this part to test
const ORIGIN = { lat: 51.5074, lng: -0.1278 }; // Central London
const DESTINATION = { lat: 51.5154, lng: -0.0722 }; // Allgate East

////// More weathers to add ////////
// Sunny
// Heavy rain
// Thunderstorm
////////////////////////////////////


// Home button component
const AltRouteHeader = () => {
    return (
        // <button className="home_button">Home</button>
        <h1>Alternate Routes</h1>
    )
}

const StartSession = () => {
     return (
        <button className="start_session_button">
        <img
            className="start_session_icon"
            alt="Start Session Button"
            src={startButton}
        />
        Start Session
        </button>
    );
};

// Route selection sidebar component
const RouteSideBar = ({ routes, selectedRouteIndex, onSelectedRoute}) => {
        return (
        <>
            {routes.map((route, index) => (
                <div
                    key={index}
                    className={`route_card ${
                        selectedRouteIndex === index ? "active_route" : ""
                    }`}
                    onClick={() => onSelectedRoute(index)}
                >
          <div className="route_card_header">
            <p className="route_name">Route {index + 1}</p>
            <p className="route_distance">{route.distanceKm} km</p>
                        </div>

          <div className="route_details">
                        <div className="route_detail_item">
              Estimated Time: {route.durationText}
                    </div>
                </div>
            </div>
      ))}
    </>
        );
    };

const RouteLines = ({ routes, selectedRouteIndex, onRouteClick}) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !window.google || !routes.length) return;

        const bounds = new window.google.maps.LatLngBounds();
        const polylines = [];
        routes.forEach((route, index)=> {
            const path = window.google.maps.geometry.encoding.decodePath(route.polyline);

            path.forEach((point) => bounds.extend(point));
            //change this part to make the map look
            const polyline = new window.google.maps.Polyline({
                path,
                map,
                strokeOpacity: index === selectedRouteIndex ? 1: 0.45,
                strokeWeight: index === selectedRouteIndex ? 6:4,
                clickable: true,
            });
            polyline.addListener("click", () => onRouteClick(index));
            polylines.push(polyline);
        });
    if (!bounds.isEmpty()) {
        map.fitBounds(bounds,60);
    }
    return () =>{
        polylines.forEach((polyline) => polyline.setMap(null));
    };
    }, [map, routes, selectedRouteIndex, onRouteClick]);

    return null;
};



            


// route map component
const RouteMap = ({routes, selectedRouteIndex, onRouteClick}) => {
    const selectedRoute = routes[selectedRouteIndex];
    const center = useMemo(() => ORIGIN, []);
    return (
        <div className="route_map">
            <div className="map_header">
                <div className="selected_route">Route {selectedRouteIndex + 1}</div>
                <div className="timeStamp">{selectedRoute ? selectedRoute.durationText : "00:00:00"}</div>
                </div>
            <div className="map_canvas_wrapper">
                <APIProvider
                    apiKey={import.meta.env.VITE_MAPS_KEY}
                    libraries={["geometry", "marker"]}
                >
                    <Map
                        defaultCenter={center}
                        defaultZoom={13}
                        mapId="DEMO_MAP_ID"
                        gestureHandling="greedy"
                        style={{width: "100%", height: "100%"}}
                    >
                        <AdvancedMarker position={ORIGIN} title="Start" />
                        <AdvancedMarker position={DESTINATION} title="Start" />
                        <RouteLines
                        routes={routes}
                        selectedRouteIndex={selectedRouteIndex}
                        onRouteClick={onRouteClick}
                        />
                    </Map>
                </APIProvider>
            </div>
        </div>

       
    );
};


//convert seconds to minutes//
function formatDuration(durationString){
    const seconds = Number(String(durationString).replace("s", ""));
    const minutes = Math.round(seconds/60);

    if (minutes < 60) return `${minutes} mins`;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes} mins`;
}

async function getRoutes(origin, destination){
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
    if(!response.ok){
        const errorText = await response.text();
        throw new Error(`Map routing API error: ${response.status} ${errorText}`);
    }
    return response.json();
}


// MAIN COMPONENT RENDERING //
const AlternateRoute = () => {
    const [routes, setRoutes] = useState([]);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ error, setError] = useState("");

    useEffect(() => {
        async function loadRoutes() {
            try{
                setLoading(true);
                setError("");
                const data = await getRoutes(ORIGIN, DESTINATION);
                console.log("routes API data:", data) // to check if there are any errors //

                const formattedRoutes = (data.routes || []).map((route) => ({
                    distanceMeters: route.distanceMeters,
                    distanceKm: (route.distanceMeters/1000).toFixed(1),
                    durationText: formatDuration(route.duration),
                    polyline: route.polyline.encodedPolyline,
                    labels: route.routeLabels || [],
                }));
                setRoutes(formattedRoutes);
            } catch (err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadRoutes();
    }, []);

    return (
        <div className="alternate_route_container">
            <div className="home_button_container">
                <AltRouteHeader />
            </div>
            <div className="start_session_container">
                <StartSession />
                {loading && <p>Loading routes...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && routes.length>0 && (
                    <RouteSideBar
                    routes={routes}
                    selectedRouteIndex={selectedRouteIndex}
                    onSelectedRoute={setSelectedRouteIndex}
                    />
                )}
            </div>
            <div className="map_placeholder_container">
                {!loading && !error && routes.length>0 && (
                    <RouteMap
                    routes={routes}
                    selectedRouteIndex={selectedRouteIndex}
                    onRouteClick={setSelectedRouteIndex}
                    />
                )}
            </div>
        </div>
    );
}

export default AlternateRoute;
