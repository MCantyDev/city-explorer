// API Config 
// Holds the required data required for the APIs

export const baseServerURL = import.meta.env.VITE_BASE_SERVER_URL

export const photonConfig = {
    baseUrl: 'https://photon.komoot.io/api' // ?q=m&osm_tag=place:city&limit=50'
};

export const restCountriesConfig = {
    baseUrl: 'https://restcountries.com/v3.1', // alpha/GB
}

export const OpenWeatherConfig = {
    baseUrl: 'https://api.openweathermap.org/data/3.0/onecall', // ?lat=53.4794892&lon=-2.2451148&exclude=current,minutely,alerts&appid={APIKEY}
    apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY
}

export const OpenTripConfig = {
    baseUrl: 'https://api.opentripmap.com/0.1/en/', // places/geoname?name=Manchester&apikey={APIKEY}
    apiKey: import.meta.env.VITE_OPENTRIP_API_KEY
}