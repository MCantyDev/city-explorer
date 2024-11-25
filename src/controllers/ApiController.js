// Api Controller
import PhotonAPI from "../models/PhotonAPI";

// Need to add proper Comments
class ApiController {
    // Doesnt need anything within the constructor as it is just an Object which bridges the gap between the Models and View
    constructor() {}

    async callPhoton(searchQuery) {
        let api = new PhotonAPI();
        return await api.callApi(searchQuery)
    }
}

export default ApiController;