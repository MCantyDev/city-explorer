import { useState, useEffect } from "react";
import CityController from "../controllers/CityController";

// Custom React Hook
// Purpose -> Takes in the City and Country Code, Calls ninjas using the Controller and returns the data, loading state, and error
const useCityData = (city, countryCode) => {
    const controller = new CityController();

    // States
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Async arrow function as useEffect cannot be async
        const fetchCityData = async () => {
            try {
                setLoading(true);
                const data = await controller.callNinjas(city, countryCode);
                setData(data);
            } catch (err) {
                setError("Failed to Fetch City Data");
            } finally {
                setLoading(false);
            }
        };

        fetchCityData();
    }, [city, countryCode]);

    return { data, loading, error };
}

export default useCityData;