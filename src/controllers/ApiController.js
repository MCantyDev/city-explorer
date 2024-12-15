// Api Controller
import PhotonAPI from '../models/PhotonAPI';
import RestCountriesApi from '../models/RestCountriesAPI';
import OpenWeatherAPI from '../models/OpenWeatherAPI';
import OpenTripAPI from '../models/OpenTripAPI';

// Need to add proper Comments
class ApiController {
    // Doesn't need anything within the constructor as it is just an Object which bridges the gap between the Models and View
    constructor() {
        this.photon = new PhotonAPI();
        this.restCountries = new RestCountriesApi();
        this.openWeather = new OpenWeatherAPI();
        this.openTrip = new OpenTripAPI();
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
     * @returns {Promise<Object>}
     */
    async callRestCountries(searchQuery) {
        return await this.restCountries.callApi(searchQuery)
    }

    /**
     * Calls the OpenWeather API
     * @param {double} latitude - Latitude
     * @param {double} longitude - Longitude
     * @returns {Promise<Object>}
     */
    async callOpenWeather(latitude, longitude) {
        return await this.openWeather.callApi(latitude, longitude);
    }

    /**
     * Calls the OpenTrip API for Locations List using /places endpoint
     * @param {double} lat - Latitude
     * @param {double} long - Longitude
     * @returns {Promise<Object>}
     */
    async callOpenTrip(lat, long) {
        return await this.openTrip.getLocationsList(lat, long);
    }

    /**
     * Calls the OpenTrip API for Location Details using /xid endpoint
     * @param {string} xid - OpenTrip ID of the location
     * @returns {Promise<Object>}
     */
    async callOpenTripDetails(xid) {
        return await this.openTrip.getLocationDetails(xid);
    }
}

export default ApiController;