// Class to call the Ninjas APIs (for now City API)

class NinjasAPI {
    constructor() {}

    // Code Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    /**
     * Calls the City API (provided by Ninjas) to fetch data for a specific city.
     * @param {string} cityName - The name of the city to search for.
     * @param {string} countryCode - The ISO 3166-1 Alpha-2 Country Code of what country the city is in.
     * @returns {Object|null} - Returns city data if successful, or null if there is an error or no data
     */
    async callCityApi(cityName, countryCode) {
        // Validate Input Params
        if (!cityName || !countryCode) {
            console.error("Invalid Input: City Name and Country Code Required")
            return null
        }

        // Build API url which would be used to fetch city Data
        this._buildCityApiUrl(cityName, countryCode)

        try {
            const response = await fetch(this.apiUrl, {
                headers: {
                    "X-Api-Key": import.meta.env.VITE_NINJAS_API_KEY
                }
            });
            
            // Check if Response is OK
            if (!response.ok) {
                throw new Error(`Response status: ${response.statusText}`)
            }
            
            const data = await response.json();
            // Return null if API returns empty JSON object
            if (Object.keys(data).length === 0) {
                return null;
            }

            // In Future add Data Validator

            return data;
        } catch (error) {
            console.error(`Error Fectching City Data for ${cityName}, ${countryCode} `, error);
            return null; // Return null in case of error
        }
    }

    // Methods

    /**
     * Builds the API url to be used to call the City API
     * @param {string} cityName - The name of the City searching for.
     * @param {string} countryCode - The ISO 3166-1 Alpha-2 country code of the country.
     */
    _buildCityApiUrl(cityName, countryCode) {
        this.apiUrl = `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryCode)}`;
    }

    /**
     * Validates the format of the JSON returned by the City API
     * @returns {boolean} - Returns true if data is correctly formatted and false if the data is incorrectly formatted
     */
    _validateCityReturn() {
        return true;
    }
}

export default NinjasAPI;