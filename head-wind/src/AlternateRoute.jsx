import { useState } from 'react'
import startButton from "./assets/start_button.png";
import "./altRouteMain.css";

// alternate route value placeholders //
const altRouteData = {
    route1: {
        distance: "5km",
        estimatedTime: "20mins",
        condition: { label: "Best", color: "best" },
        rainChance: "10%",
        wind: "4 km/h",
        description: "☁️ Clear sky",
    },
    route2: {
        distance: "6km",
        estimatedTime: "22mins",
        condition: { label: "None", color: "none" },
        rainChance: "35%",
        wind: "9 km/h",
        description: "🌤️ Partly cloudy",
    },
    route3: {
        distance: "6km",
        estimatedTime: "25mins",
        condition: { label: "None", color: "none" },
        rainChance: "70%",
        wind: "15 km/h",
        description: "🌦️ Light rain",
    }
}

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

// Route selection sidebar component
const RouteSideBar = ({ selectedRoute, setSelectedRoute}) => {
   // extended menu with route details
    const RouteItem = ({ routeKey, routeNum, data }) => {
        const isSelected = selectedRoute === routeKey;

        return (
            <div className={`route_item ${isSelected ? "route_selected" : ""}`}
                onClick={() => setSelectedRoute(isSelected ? null : routeKey)}
            >
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
}

// route map component (placeholder for now)
const RouteMap = ({selectedRoute}) => {
    return (
        <div className="route_map">
            <div className="map_header">
                <div className="selected_route">
                    {selectedRoute ? `Route ${selectedRoute.slice(-1)}` : "Route 1"}
                </div>
            </div>
            <div className="map_placeholder">Map Placeholder</div>
        </div>
    )
}


// MAIN COMPONENT RENDERING //
const AlternateRoute = () => {
    const [selectedRoute, setSelectedRoute] = useState("route1");
    return (
        <div className="alternate_route_container">
            <div className="home_button_container">
                <AltRouteHeader />
            </div>
            <div className="route_navbar">
                <RouteSideBar selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
            </div>
            <div className="map_placeholder_container">
                <RouteMap selectedRoute={selectedRoute} />

            </div>
        </div>
    )
}

export default AlternateRoute;
