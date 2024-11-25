// API Config 
// Holds the required data required for the APIs

export const photonConfig = {
    baseUrl: "https://photon.komoot.io/api" //?q=m&osm_tag=place:city&limit=50"
};

export const ninjasConfig = {
    baseUrl: "https://api.api-ninjas.com/v1", //city?name=Manchester
    apiKey: import.meta.env.VITE_NINJAS_API_KEY
}

export const restCountriesConfig = {
    baseUrl: "https://restcountries.com/v3.1", //alpha/GB
}

export const OpenWeatherConfig = {
    baseUrl: "https://api.openweathermap.org/data/3.0/onecall", //?lat=53.4794892&lon=-2.2451148&exclude=current,minutely,alerts&appid={APIKEY}
    apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY
}