import { useState } from 'react'
import startButton from "./assets/start_button.png";
import "./altRouteMain.css";

// alternate route value placeholders //
const altRouteData = {
    route1: {
        distance: "5km",
        estimatedTime: "20 mins",
        headwind: "10 km/h"
    },
    route2: {
        distance: "6km",
        estimatedTime: "22 mins",
        headwind: "5 km/h"
    },
    route3: {
        distance: "6km",
        estimatedTime: "22 mins",
        headwind: "5 km/h"
    }
}

// Home button component
const AltRouteHeader = () => {
    return (
        // <button className="home_button">Home</button>
        <h1>Alternate Routes</h1>
    )
}

// Route selection sidebar component
const RouteSideBar = () => {
    const { route1, route2, route3 } = altRouteData;
    return (
        <>
            <div className="route1">
                <div className="route1_header">
                    <p className="route1_name">Route 1</p>
                    <p className="route1_distance">{route1.distance}</p>
                </div>
                {/* <div className="route1_details">
                    <div className="route1_detail_item">Estimated Time: {route1.estimatedTime}</div>
                    <div className="route1_detail_item">Headwind: {route1.headwind}</div>
                </div> */}
            </div>
            <div className="route2">
                <div className="route2_header">
                    <p className="route2_name" >Route 2</p>
                    <p className="route2_distance">{route2.distance}</p>
                </div>
                {/* <div className="route2_details">
                    <div className="route2_detail_item">Estimated Time: {route2.estimatedTime}</div>
                    <div className="route2_detail_item">Headwind: {route2.headwind}</div>
                </div> */}
            </div>
            <div className="route3">
                <div className="route3_header">
                    <p className="route3_name">Route 3</p>
                    <p className="route3_distance">{route3.distance}</p>
                </div>
                {/* <div className="route3_details">
                    <div className="route3_detail_item">Estimated Time: {route3.estimatedTime}</div>
                    <div className="route3_detail_item">Headwind: {route3.headwind}</div>
                </div> */}
            </div>
        </>
    )
}

// start session button component
const StartSession = () => {
    return (
        <button className="start_session_button">
            <img className="start_session_icon" alt="Start Session Button" src={startButton} />
            Start Session
        </button>
    )
}

// route map component (placeholder for now)
const RouteMap = () => {
    return (
        <div className="route_map">
            <div className="map_header">
                <div className="selected_route">Route 1</div>
                <div className="timestamp">00:00:00</div>
            </div>
            <div className="map_placeholder">Map Placeholder</div>
        </div>
    )
}


// MAIN COMPONENT RENDERING //
const AlternateRoute = () => {
    const [count, setCount] = useState(0)
    return (
        <div className="alternate_route_container">
            <div className="home_button_container">
                <AltRouteHeader />
            </div>
            <div className="start_session_container">
                <StartSession />
                <RouteSideBar />
            </div>
            <div className="map_placeholder_container">
                <RouteMap />
            </div>
        </div>
    )
}

export default AlternateRoute;
