/* Base Imports */
import { useEffect, useState } from "react";

/**
 * React Hook to fetch the country data from the RestCountries API
 * @param {string} searchQuery - Search Query for the RestCounties API
 * @param {ApiController} ApiController 
 * @returns {Object} - Object containing the data, error and loading state
 */
function useCountryData(searchQuery, ApiController) {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            try {
                const result = await ApiController.callRestCountries(searchQuery);

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
    }, [ searchQuery, ApiController ]);
    
    return { data, error, isLoading }
}

export default useCountryData;