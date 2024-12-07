// Api Controller
import PhotonAPI from "../models/PhotonAPI";
import RestCountriesApi from "../models/RestCountriesAPI";
import OpenWeatherAPI from "../models/OpenWeatherAPI";

// Need to add proper Comments
class ApiController {
    // Doesn't need anything within the constructor as it is just an Object which bridges the gap between the Models and View
    constructor() {
        this.photon = new PhotonAPI();
        this.restCountries = new RestCountriesApi();
        this.openWeather = new OpenWeatherAPI();
    }

    /**
     * Calls the Photon API
     * @param {string} searchQuery
     * @returns {Promise<Object>}
     */
    async callPhoton(searchQuery) {
        return await this.photon.callApi(searchQuery)
    }

    /**
     * Calls the RestCountries API
     * @param {string} searchQuery 
     * @returns 
     */
    async callRestCountries(searchQuery) {
        return await this.restCountries.callApi(searchQuery)
    }

    /**
     * Calls the OpenWeather API
     * @param {int} latitude 
     * @param {int} longitude 
     * @returns 
     */
    async callOpenWeather(latitude, longitude) {
        return await this.openWeather.callApi(latitude, longitude);
    }
}

export default ApiController;