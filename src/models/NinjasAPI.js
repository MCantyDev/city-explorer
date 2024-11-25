// Class to call the Ninjas APIs (for now City API)
import { ninjasConfig } from "../config/ApiConfig";

// No longer in use
class NinjasAPI {
    /**
     * Constructor for NinjasAPI
     */
    constructor() {
        this.baseUrl = ninjasConfig.baseUrl;
    }

    // Code Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    /**
     * Calls the City API (provided by Ninjas) to fetch data for a specific city.
     * @param {string} cityName - The name of the city to search for.
     * @param {string} countryCode - The ISO 3166-1 Alpha-2 Country Code of what country the city is in.
     * @returns {Object|null} - Returns city data if successful, or null if there is an error or no data
     */
    async callApi(cityName, countryCode) {
        // Validate Input Params
        if (!cityName || !countryCode) {
            console.error("Invalid Input: City Name and Country Code Required");
            return null;
        };

        let url = `${this.baseUrl}/city?name=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryCode)}`;

        try {
            const response = await fetch(url, {
                headers: {
                    "X-Api-Key": ninjasConfig.apiKey
                }
            });
            
            // Check if Response is OK
            if (!response.ok) {
                throw new Error(`Response status: ${response.statusText}`);
            };
            
            const data = await response.json();
            // Return null if API returns empty JSON object
            if (Object.keys(data).length === 0) {
                return null;
            };

            // In Future add Data Validator
            return data;
        } catch (error) {
            console.error(`Error Fetching City Data for ${cityName}, ${countryCode} `, error);
            return null; // Return null in case of error
        };
    };

    // Methods
    /**
     * Validates the format of the JSON returned by the City API
     * @returns {boolean} - Returns true if data is correctly formatted and false if the data is incorrectly formatted
     */
    _validateCityReturn() {
        return true;
    };
};

export default NinjasAPI;