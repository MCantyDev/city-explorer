import { restCountriesConfig } from "../config/ApiConfig";
import axios from "axios";

/**
 * Class to interact with the RestCountries API
 * @class RestCountriesAPI
 * @module RestCountriesAPI
 * @exports RestCountriesAPI
 */
class RestCountriesApi {
    /**
     * Constructor for the RestCountriesAPI Class
     * Sets the Base URL for the API from the Config
     * @constructor
     */
    constructor() { 
        this.baseUrl = restCountriesConfig.baseUrl
    }

    /**
     * 
     * @param {string} countryCode - Alpha 3166-1 Alpha-2 Country Code for the Search query
     * @returns {Promise<Object>} - A Promise resolving to the country data object or an empty object in case of an error
     */
    async callApi(countryCode) { // Async Function to Call the API
        // Validate Input Params
        if (!countryCode) { // Checks if null or empty
            console.error("Invalid Input: City Name Required"); // Logs an error message
            return {}; // Returns Empty Object when Invalid Input
        };

        // Building the API URL with the provided Country Code
        let url = `${this.baseUrl}/alpha/${encodeURIComponent(countryCode)}`;

        try {
            const response = await axios.get(url); // Making the API call using axios and awaiting the response
            return response.data[0]; // Returns Data from the API (JSON object)
        } catch (error) { 
            console.error(`Error Fetching City Data for ${countryCode}`, error); // Logs an error message if the API call fails
            return {}; // Returns Empty Object
        };
    };
}

export default RestCountriesApi; // Exports the RestCountriesAPI Class for use in other files