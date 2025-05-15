/* Base Imports */
import { useEffect, useState } from 'react';
import { GetCountry } from '../controller/ServerController';

/**
 * React Hook to fetch the country data from the RestCountries API
 * @param {string} searchQuery - Search Query for the RestCounties API
 * @returns {Object} - Object containing the data, error and loading state
 */
function useCountryData(searchQuery, token) {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            try {
                const result = await GetCountry(searchQuery, token);

                let filteredResult = {}; 
                filteredResult.flag = result[0].flags.png;
                filteredResult.currencies = Object.values(result[0].currencies);
                filteredResult.languages = Object.values(result[0].languages);
                setData(filteredResult);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();
    }, [ searchQuery, token ]);
    
    return { data, error, isLoading }
}

export default useCountryData;