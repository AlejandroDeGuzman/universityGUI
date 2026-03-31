import { WeatherCard } from "../../components/weatherCard/WeatherCard";
import ForecastCard from "../../components/forecastCard/ForecastCard";
import TodayTemp from "../../components/todayTemp/TodayTemp";

function Home({ postcode, setPostcode, unit, setUnit }) {
    return (
        <>
            <WeatherCard postcode={postcode} setPostcode={setPostcode} unit={unit} />
            <ForecastCard postcode={postcode} unit={unit} />
            <TodayTemp postcode={postcode} unit={unit} />
        </>
    );
}

export default Home;
