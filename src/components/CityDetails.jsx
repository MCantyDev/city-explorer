/* Base Imports */
import propTypes from 'prop-types';

/**
 * City Details Component to display the details of the city
 * @param {Object} props - Data, Latitude, Longitude, Country Code 
 * @returns {JSX.Element} - City Details Component
 */
function CityDetails({ data, lat, long, countryCode }) {
    return (
        <section className='d-flex flex-column p-3 border shadow-sm text-center align-items-center justify-content-center' style={{ maxWidth: '400px', width: '100%' }}>
            <h3 className='mb-3 '>Details</h3>
            <p><strong>Latitude:</strong> {lat}</p>
            <p><strong>Longitude:</strong> {long}</p>
            <p><strong>Country Code:</strong> {countryCode}</p>
            {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
            <p><strong>Currency:</strong> {data.currencies.map((currency) => `(${currency.symbol}) ${currency.name}`)}</p>
            {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join */}
            <p><strong>{data.languages.length === 1 ? 'Language:' : 'Languages:'}</strong> {data.languages.join(', ')}</p>
        </section>
    )
}

CityDetails.propTypes = {
    data: propTypes.object.isRequired, // Data Object
    lat: propTypes.number.isRequired, // Latitude
    long: propTypes.number.isRequired, // Longitude
    countryCode: propTypes.string.isRequired // Country Code
};

export default CityDetails;