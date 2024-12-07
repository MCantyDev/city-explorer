import { photonConfig } from "../config/ApiConfig";
import axios from "axios";

/**
 * Class to interact with the Photon API
 * @class PhotonAPI
 * @module PhotonAPI
 * @exports PhotonAPI
 */
class PhotonAPI {
    /**
     * Constructor for the PhotonAPI Class
     * Sets the Base URL for the API from the Config
     * @constructor
     */
    constructor() { 
        this.baseUrl = photonConfig.baseUrl;
    };

    /**
     * Call the Photon API for the given City Name
     * @param {string} cityName - City name for the Search query
     * @returns {Promise<Object>} - A Promise resolving to the city data object or an empty object in case of an error
     */
    async callApi(cityName) { // Async Function to Call the API
        // Validate Input Params
        if (!cityName) { // Checks if null or empty
            console.error("Invalid Input: City Name Required"); // Logs an error message
            return {}; // Returns Empty Object when Invalid Input
        };
        
        // Building the API URL with the provided City Name and Limiting the Results to 50 for better performance
        let url = `${this.baseUrl}?q=${encodeURIComponent(cityName)}&osm_tag=place:city&osm_tag=place:municipality&osm_tag=place:town&limit=50`;

        try {
            const response = await axios.get(url); // Making the API call using axios and awaiting the response
            return response.data; // Returns Data from the API (JSON object)
        } catch (error) {
            console.error(`Error Fetching City Data for ${cityName}`, error); // Logs an error message if the API call fails
            return {}; // Returns Empty Object
        };
    };
};

export default PhotonAPI; // Exports the PhotonAPI Class for use in other files