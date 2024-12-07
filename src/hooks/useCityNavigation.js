/* Base Imports */
import { useCallback } from "react";

/**
 * Custom Hook to facilitate the selection of City from a selection
 * 
 * Requires -> data-name, data-code, data-coord
 * Data-name -> String -> City Name
 * Data-Code -> String -> Country ISO 3166-1 Alpha-2 code
 * Data-Coord -> String -> JSON stringify used on a 2 element array with Longitude and Latitude
 * @param {*} - useNavigate return
 * @returns Arrow Function
 */
function useCityNavigation(navigate) {
    return useCallback((event) => {
        const city = event.target.dataset?.city;
        const country = event.target.dataset?.country;
        const countryCode = event.target.dataset?.code;
        const coordinates = event.target.dataset?.coord;

        if (!checkCity(city) || !checkCountry(country) || !checkCountryCode(countryCode) || !checkCoordinates(coordinates)) {
            navigate("/", { state : { error : "Error while retrieving data from Search Result"}})
            return;
        }

        navigate(`/search/${countryCode}/${city}`, {
            state: { sentFromResult: true, coordinates, country },
        });
    }, [ navigate ]);
}

/**
 * Validates the city name.
 * @param {String} city - City name
 * @returns {Boolean} - True if valid, false otherwise
 */
function checkCity(city) {
    if (!checkStringNotEmpty(city, "CITY")) {
        return false;
    }
    return true;
}

/**
 * 
 * @param {String} country - Country Name
 * @returns {Boolean} - True if valid, false otherwise
 */
function checkCountry(country) {
    if (!checkStringNotEmpty(country, "COUNTRY")) {
        return false;
    }
    return true;
}

/**
 * Validates the country code.
 * @param {String} countryCode - ISO 3166-1 Alpha-2 country code
 * @returns {Boolean} - True if valid, false otherwise
 */
function checkCountryCode(countryCode) {
    if (!checkStringNotEmpty(countryCode, "COUNTRY CODE")) {
        return false;
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    if (countryCode.length !== 2 || !/^[A-Za-z]{2}$/.test(countryCode)) {
        console.error(`Country Code - ${countryCode} - Must be of format ISO 3166-1 Alpha-2`);
        return false;
    }
    return true;
}

/**
 * 
 * @param {String} value - Value to be checked
 * @param {String} fieldName - Field Name of the Value, such as City
 * @returns {Boolean} - True if valid, false otherwise
 */
function checkStringNotEmpty(value, fieldName) {
    if (typeof value !== "string" || value.trim().length === 0) {
        console.error(`Data - ${fieldName} - Attribute required for Navigation`);
        return false;
    }
    return true;
}

/**
 * Validates the coordinates.
 * @param {String} coordinates - Stringified JSON array of [longitude, latitude]
 * @returns {Boolean} - True if valid, false otherwise
 */
function checkCoordinates(coordinates) {
    try {
        const coord = JSON.parse(coordinates);

        if (!Array.isArray(coord) || coord.length !== 2) {
            console.error("Data - COORDINATES - Must be a stringified JSON array of [longitude, latitude]");
            return false;
        }

        if (!checkCoordinatesRange(coord)) {
            return false;
        };
        return true;
    } catch (error) {
        console.error("Error parsing coordinates:", error);
        return false;
    }
}

/**
 * Validates the Coordinates Range
 * @param {String} coordinates - array of [longitude, latitude]
 * @returns - True if valid, false otherwise
 */
function checkCoordinatesRange(coordinates) {
    const [longitude, latitude] = coordinates;
    if (latitude < -90 || latitude > 90) {
        console.error("Data - COORDINATES - Latitude must be in range '-90 to 90' degrees");
        return false;
    }

    if (longitude < -180 || longitude > 180) {
        console.error("Data - COORDINATES - Longitude must be in range '-180 to 180' degrees");
        return false;
    }
    return true;
}

export default useCityNavigation;
