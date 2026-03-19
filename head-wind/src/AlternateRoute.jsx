import { useState } from 'react'
import startButton from "./assets/start_button.png";
import "./altRouteMain.css";

// alternate route value placeholders //
const altRouteData = {
    route1: {
        distance: "5 km",
        estimatedTime: "20 mins",
        headwind: "10 km/h"
    },
    route2: {
        distance: "6km",
        estimatedTime: "22 mins",
        headwind: "5 km/h"
    }
}

// Home button component
const HomeButton =() => {
    return (
        <div className="home_button_container">
            <button className="home_button">Home</button>
        </div>
    )
}

// Route selection sidebar component
const RouteSideBar = () => {
    const { route1, route2 } = altRouteData;
    return (
        <div className="route-sidebar">
            <div className="route1">
                <div className="route1-header">
                    Route 1 
                    {route1.distance}
                </div>
                <div className="route1-details">
                    <div className="route1-detail-item">Estimated Time: {route1.estimatedTime}</div>
                    <div className="route1-detail-item">Headwind: {route1.headwind}</div>
                </div>
            </div>
            <div className="route2">
                <div className="route2-header">
                    Route 2
                    {route2.distance}
                </div>
                <div className="route2-details">
                    <div className="route2-detail-item">Estimated Time: {route2.estimatedTime}</div>
                    <div className="route2-detail-item">Headwind: {route2.headwind}</div>
                </div>
            </div>
        </div>
    )
}

// start session button component
const StartSession = () => {
    return (
        <div className="start_session_button">
            <img className="start_session_icon" alt="Start Session Button" src={startButton}/>
            <button className="start_session_button">Start Session</button>
        </div>
    )
}

// route map component (placeholder for now)
const RouteMap = () => {
    return (
        <div className="route-map">
            <div className="map-placeholder">Map Placeholder</div>
        </div>
    )
}

// Main component for alternate route page
const AltRouteMain = () => {
    return (
        <div className="alternate-route-container">
            <HomeButton />
            <div>
                <StartSession />
                <RouteSideBar />
                <RouteMap />
            </div> 
        </div>
    )
}


/// MAIN COMPONENT ///
function AlternateRoute() {
  const [count, setCount] = useState(0)


  return (
    <div className="alt_route_main">
        <AltRouteMain />
    </div>
  );
}

export default AlternateRoute;
