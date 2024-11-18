// City Controller, would handle the interaction between the City Page and the Object Models
import NinjasAPI from "../models/Ninjas";

// Need to add proper Comments
class CityController {
    // Doesnt need anything within the constructor as it is just an Object which bridges the gap between the Models and View
    constructor() {}

    // Asyncronous Function Call
    async callNinjas(cityName, countryCode) {
        let api = new NinjasAPI();
        return await api.callCityApi(cityName, countryCode); // Await the promise to get the data
    }
}

export default CityController;