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
    baseUrl: "https://restcountries.com/v3.1", // /   alpha/GB
}