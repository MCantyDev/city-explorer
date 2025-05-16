/* Base Imports */
import { useEffect, useState } from 'react';
import { GetCountry } from '../server-communicator/ServerCommunicator';

/**
 * React Hook to fetch the country data from the RestCountries API
 * @param {string} searchQuery - Search Query for the RestCounties API
 * @returns {Object} - Object containing the data, error and loading state
 */
function useCountryData(name, code, token) {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            try {
                const result = await GetCountry(name, code, token);

                let filteredResult = {}; 
                filteredResult.flag = result.flags.png;
                filteredResult.currencies = Object.values(result.currencies);
                filteredResult.languages = Object.values(result.languages);
                setData(filteredResult);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();
    }, [ name, code, token ]);
    
    return { data, error, isLoading }
}

export default useCountryData;