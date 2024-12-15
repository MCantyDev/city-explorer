import { useState, useEffect } from 'react';

/**
 * 
 * @param {double} lat - Latitude of the location
 * @param {double} long - Longitude of the location
 * @param {APIController} apiController - API Controller to call the OpenTrip API
 * @returns - Object containing the data, error and loading state
 */
function useTouristData(lat, long, apiController) { 
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            try {
                const result = await apiController.callOpenTrip(lat, long);
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();
    }, [ lat, long, apiController ]);

    return { data, error, isLoading }
}

export default useTouristData;