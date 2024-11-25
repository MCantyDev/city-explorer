import { restCountriesConfig } from "../config/ApiConfig";
import axios from "axios";

class RestCountriesApi {
    constructor() {
        this.baseUrl = restCountriesConfig.baseUrl
    }

    async callApi(searchQuery) {
        // Validate Input Params
        if (!searchQuery) {
            console.error("Invalid Input: City Name Required");
            return {};
        };

        let url = `${this.baseUrl}/alpha/${encodeURIComponent(searchQuery)}`;

        try {
            const response = await axios.get(url);
            return response.data[0];
        } catch (error) {
            console.error(`Error Fetching City Data for ${searchQuery}`, error);
            return {};
        };
    };
}

export default RestCountriesApi;