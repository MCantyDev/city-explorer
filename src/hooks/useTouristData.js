import { useState, useEffect } from 'react';
import { GetCitySights } from '../server-communicator/ServerCommunicator';

/**
 * 
 * @param {double} lat - Latitude of the location
 * @param {double} long - Longitude of the location
 * @returns - Object containing the data, error and loading state
 */
function useTouristData(lat, long, cityName, countryCode, token) { 
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (!countryCode) {
            return;
        }

        const performSearch = async () => {
            try {
                const result = await GetCitySights(lat, long, cityName, countryCode, token);
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();
    }, [ lat, long, cityName, countryCode, token ]);

    return { data, error, isLoading }
}

export default useTouristData;