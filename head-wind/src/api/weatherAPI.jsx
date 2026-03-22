export const fetchLatitudeLongitude = async (zipCode) => {
    const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},GB&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch latitude and longitude data.");
    }

    const data = await response.json();

    return {
        name: data.name,
        lat: data.lat,
        lon: data.lon,
    };
}
