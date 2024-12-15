import propTypes from 'prop-types';
import './css/WeatherWidget.css';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';

/**
 * React Hook to convert Unix Timestamp to Date
 * @param {number} datetime - Unix Timestamp
 * @param {number} dtOffset - Offset in seconds for Unix Timestamp
 * @returns 
 */
function useDate(datetime, dtOffset) {
    // Handles 0 returns null
    if (!datetime) {
        return null;
    }
    return new Date((datetime + dtOffset) * 1000); // Adds offset to datetime and converts it to Date
}

/**
 * WeatherWidget Component to display Weather Information
 * @param {Object} props - Weather Data, Time Offset, City Name
 * @returns {JSX.Element} - WeatherWidget Component
 */
function CurrentWeatherWidget( { data = null, dtDiff = 0, city = 'City Name' } ) {
    // Get the Date from the Unix Timestamp
    const date = useDate(data?.dt || 0, dtDiff); // Either using dt or 0 if dt is null

    return (
        <section className='py-2 border shadow-sm align-items-center' style={{ maxWidth: '400px', width: '100%' }}>
            <Container className='text-center'>
                <img
                src={data?.weather[0]?.icon ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : 'https://placehold.co/100' }
                alt={data?.weather[0]?.description ? data.weather[0].description : 'Weather icon unavailable'}
                className='weather-icon'
                />
            <h2 className='city-name'>{city}</h2>
            </Container>
            <Container className='text-center'>
                <p className='temp'>{ data?.temp ? `${Math.round(data.temp)}°C` : 'no temperature' }</p>
                <p className='date'>{ date !== null ? date.toLocaleDateString() : 'no date' }</p>
                <p className='time'>{ date !== null ? date.toLocaleTimeString() : 'no time' }</p>
                <p className='humidity'>Humidity: { data?.humidity ? `${data.humidity}%` : 'no data' }</p>
                <p className='weather-condition'>{ data?.weather[0]?.description ? data.weather[0].description : 'no description' }</p>
                <p className='wind-speed'>Wind Speed: { data?.wind_speed ? `${data.wind_speed} m/s` : 'no data' }</p>
            </Container>
        </section>
    );
};

// Prop Types for WeatherWidget Component
CurrentWeatherWidget.propTypes = {
    data: propTypes.shape({ // What the Weather Data needs to Contain
        dt: propTypes.number, // Unix Timestamp
        temp: propTypes.number, // Temperature in Celsius
        humidity: propTypes.number, // Humidity in %
        wind_speed: propTypes.number, // Wind Speed in m/s
        weather: propTypes.arrayOf(  
            propTypes.shape({
                icon: propTypes.string,  // Weather Icon
                description: propTypes.string // Weather Description
            })
        )
    }),
    dtDiff: propTypes.number, // Time Offset
    city: propTypes.string // City Name
};

export default CurrentWeatherWidget; // Export the WeatherWidget Component