// Api Controller
import PhotonAPI from "../models/PhotonAPI";
import RestCountriesApi from "../models/RestCountriesAPI";

// Need to add proper Comments
class ApiController {
    // Doesnt need anything within the constructor as it is just an Object which bridges the gap between the Models and View
    constructor() {
        this.photon = new PhotonAPI();
        this.restcountries = new RestCountriesApi();
    }

    async callPhoton(searchQuery) {
        return await this.photon.callApi(searchQuery)
    }

    async callRestCountries(searchQuery) {
        return await this.restcountries.callApi(searchQuery)
    }
}

export default ApiController;