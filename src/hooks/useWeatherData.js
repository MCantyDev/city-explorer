/* Base Imports */
import { useState, useEffect } from 'react';

import { GetCityWeather } from '../server-communicator/ServerCommunicator';

/**
 * React Hook to fetch the weather data from the OpenWeather API
 * @param {double} lat - Latitude of the location
 * @param {double} long - Longitude of the location
 * @returns {Object} - Object containing the data, error and loading state
 */
function useWeatherData(lat, long, cityName, countryCode, token) {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (!countryCode) {
            return;
        }

        const performSearch = async () => {
            try {
                const result = await GetCityWeather(lat, long, cityName, countryCode, token);
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();
    }, [ lat, long,cityName, countryCode, token ]);

    return { data, error, cityName, countryCode, isLoading }
}

export default useWeatherData;