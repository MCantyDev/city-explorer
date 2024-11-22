import { photonConfig } from "../config/ApiConfig";
import axios from "axios";

class PhotonAPI {
    constructor() { 
        this.baseUrl = photonConfig.baseUrl;
    };

    async callApi(cityName) {
        // Validate Input Params
        if (!cityName) {
            console.error("Invalid Input: City Name Required");
            return {};
        };

        let url = `${this.baseUrl}?q=${encodeURIComponent(cityName)}&osm_tag=place:city&limit=50`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Error Fetching City Data for ${cityName}`, error);
            return {};
        };
    };
};

export default PhotonAPI;