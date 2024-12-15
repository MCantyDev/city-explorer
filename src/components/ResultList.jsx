/* Base Imports */
import PropTypes from 'prop-types';
import './css/ResultList.css';

/* Custom Hook Imports */
import useCityNavigation from '../hooks/useCityNavigation';

/**
 * ResultList Component to render the Result List of Cities
 * @param {Object} props - Result List Data, React navigate Function
 * @returns {JSX.Element} - ResultList Component
 */
function ResultList({ data, navigate }) {
    const handleCityChoice = useCityNavigation(navigate); // Handle City Choice using the useCityNavigation hook

    return (
        <ul className='result-list'>   
            {data.map((result, index) => (
                <li key={index}>
                    <button
                        className='w-100 result' 
                        aria-label={'Go to ' + result.properties.name + ', ' + result.properties.country + ' page'}
                        data-city={result.properties.name}
                        data-country={result.properties.country}
                        data-code={result.properties.countrycode}
                        data-coord={JSON.stringify(result.geometry.coordinates)}
                        onClick={handleCityChoice}>
                            <strong>{result.properties.name}</strong> - {result.properties.state ? result.properties.state : 'No State'} - {result.properties.country}
                    </button>
                </li>
            ))}
        </ul>
    )
}

ResultList.propTypes = {
    data: PropTypes.array.isRequired,
    navigate: PropTypes.func.isRequired
};

export default ResultList;