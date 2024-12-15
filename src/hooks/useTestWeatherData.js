import { useState, useEffect } from 'react';

/**
 * React Hook to fetch the test weather data from the local JSON file
 * @returns {Object} - Object containing the data, error and loading state
 */
export function useTestWeatherData() { 
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            try {
                const result = await fetch('/testWeather.json');
                if (!result.ok) {
                    throw new Error('Error Fetching Data');
                }
                const data = await result.json();
                setData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        performSearch();
    }, [ data, error, isLoading]);

    return { data, error, isLoading }
}

export default useTestWeatherData;