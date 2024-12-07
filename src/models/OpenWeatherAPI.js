import { OpenWeatherConfig } from "../config/ApiConfig";
import axios from "axios";

/**
 * Class to interact with the OpenWeather API
 * @class OpenWeatherAPI
 * @module OpenWeatherAPI
 * @exports OpenWeatherAPI
 */
class OpenWeatherAPI {
    /**
     * Constructor for the OpenWeatherAPI Class
     * Sets the Base URL for the API from the Config
     * @constructor
     */
    constructor() {
        this.baseUrl = OpenWeatherConfig.baseUrl;
    }

    /**
     * Calls the OpenWeather API for the given Latitude and Longitude and returns a Promise to Await
     * @param {number} latitude - Latitude of the Location
     * @param {number} longitude - Longitude of the Location
     * @returns {Promise<Object>} - A Promise resolving to the weather data object or an empty object in case of an error
     */
    async callApi(latitude, longitude) {
        // Validate Input Params - Checks if null. Cant check if 0 as 0 is a valid value
        if (latitude === null || longitude === null) {
            console.error("Invalid Input: Latitude and Longitude Required");
            return {}; // Returns Empty Object when Invalid Input
        }

        // Building the API URL with the provided Latitude, Longitude and API Key
        let url = `${this.baseUrl}?lat=${latitude}&lon=${longitude}&exclude=alerts,hourly,minutely&units=metric&appid=${OpenWeatherConfig.apiKey}`;

        try {
            // Making the API call using axios and awaiting the response
            const response = await axios.get(url);
            return response.data; // Returns Data from the API (JSON object)
            
        } catch (error) {
            // Logs an error message if the API call fails
            console.error(`Error Fetching Weather Data for ${latitude}, ${longitude}`, error); // Logging to Console even though not the best due to not wanting to create an actual solution for error handling
            return {}; // Returns Empty Object
        }
    }
}

export default OpenWeatherAPI; // Exports the OpenWeatherAPI Class for use in other files