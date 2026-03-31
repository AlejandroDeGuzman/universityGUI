import { WeatherCard } from "../../components/weatherCard/WeatherCard";
import ForecastCard from "../../components/forecastCard/ForecastCard";
import TodayTemp from "../../components/todayTemp/TodayTemp";

function Home({ postcode, setPostcode }) {
    return (
        <>
            <WeatherCard postcode={postcode} setPostcode={setPostcode} />
            <ForecastCard postcode={postcode} />
            <TodayTemp postcode={postcode} />
        </>
    );
}

export default Home;
