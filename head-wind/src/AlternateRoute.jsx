import { useState } from 'react'
import startButton from "./assets/start_button.png";
import "./altRouteMain.css";

// alternate route value placeholders //
const altRouteData = {
    route1: {
        distance: "5km",
        estimatedTime: "20mins",
        condition: { label: "Ideal", color: "ideal" },
        rainChance: "10%",
        wind: "4 km/h",
        description: "Clear sky",
    },
    route2: {
        distance: "6km",
        estimatedTime: "22mins",
        condition: { label: "Good", color: "good" },
        rainChance: "35%",
        wind: "9 km/h",
        description: "Partly cloudy",
    },
    route3: {
        distance: "6km",
        estimatedTime: "25mins",
        condition: { label: "Tough", color: "tough" },
        rainChance: "70%",
        wind: "15 km/h",
        description: "Light rain",
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
   // extended menu with route details
    const RouteItem = ({ routeKey, routeNum, data }) => {
        return (
            <div className="route_item">
                <div className="route_header">
                    <div className="route_header_left">
                        <p className="route_name">Route {routeNum}</p>
                        <div className="route_main_details">
                            <span>{data.distance}</span>
                            <span className="details_divider">·</span>
                            <span>{data.estimatedTime}</span>
                        </div>
                    </div>
                    <span className={`condition_badge badge-${data.condition.color}`}>
                        {data.condition.label}
                    </span>
                </div>
                <div className="route_expanded">
                    <div className="details_inner">
                        <div className="route_detail_item">
                            <span className="detail_label">Rain chance</span>
                            <span className="detail_value">{data.rainChance}</span>
                        </div>
                        <div className="route_detail_item">
                            <span className="detail_label">Wind</span>
                            <span className="detail_value">{data.wind}</span>
                        </div>
                        <div className="route_detail_item">
                            <span className="detail_label">Condition</span>
                            <span className="detail_value">{data.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <RouteItem routeKey="route1" routeNum={1} data={altRouteData.route1} />
            <RouteItem routeKey="route2" routeNum={2} data={altRouteData.route2} />
            <RouteItem routeKey="route3" routeNum={3} data={altRouteData.route3} />
        </>
    );
    
    // return (
    //     <>
    //         <div className="route1">
    //             <div className="route1_header">
    //                 <p className="route1_name">Route 1</p>
    //                 <p className="route1_distance">{route1.distance}</p>
    //             </div>
    //             {/* <div className="route1_details">
    //                 <div className="route1_detail_item">Estimated Time: {route1.estimatedTime}</div>
    //                 <div className="route1_detail_item">Headwind: {route1.headwind}</div>
    //             </div> */}
    //         </div>
    //         <div className="route2">
    //             <div className="route2_header">
    //                 <p className="route2_name" >Route 2</p>
    //                 <p className="route2_distance">{route2.distance}</p>
    //             </div>
    //             {/* <div className="route2_details">
    //                 <div className="route2_detail_item">Estimated Time: {route2.estimatedTime}</div>
    //                 <div className="route2_detail_item">Headwind: {route2.headwind}</div>
    //             </div> */}
    //         </div>
    //         <div className="route3">
    //             <div className="route3_header">
    //                 <p className="route3_name">Route 3</p>
    //                 <p className="route3_distance">{route3.distance}</p>
    //             </div>
    //             {/* <div className="route3_details">
    //                 <div className="route3_detail_item">Estimated Time: {route3.estimatedTime}</div>
    //                 <div className="route3_detail_item">Headwind: {route3.headwind}</div>
    //             </div> */}
    //         </div>
    //     </>
    // )
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
