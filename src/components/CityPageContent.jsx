/* Base Imports */
import PropTypes from 'prop-types';
import { useEffect } from 'react';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

/* Custom Component Imports */
import FlagSection from './FlagSection';
import CityDetails from './CityDetails';
import WeeklyWeather from './WeeklyWeather';
import POIList from './POIList';
import CurrentWeatherWidget from './CurrentWeatherWidget';
import Notification from './Notification';
import Map from './Map';

import { useAuth } from '../context/AuthContext'

/* Custom Hook Imports */
import useCountryData from '../hooks/useCountryData';
import useWeatherData from '../hooks/useWeatherData';
import useTouristData from '../hooks/useTouristData';

/**
 * CityPageContents Component is used to render the City Page Contents
 * @param {object} props - City, Country, Country Code and Coordinates 
 * @returns {JSX.Element} - CityPageContents Component
 */
function CityPageContents({ city, country, countryCode, coord }) {
    const { token, loading } = useAuth();
    if (loading) { return; };

    const [ long, lat ] = coord; // Destructure the Coordinates into long and lat - [long, lat]

    const { data, isLoading } = useCountryData(country, countryCode, token);

    const isCountryReady = !!data && !isLoading;
    const { data: touristData, isLoading: touristLoading } = useTouristData(lat, long, city, isCountryReady ? countryCode : null, token);
    const { data: weatherData, isLoading: weatherLoading } = useWeatherData(lat, long, city, isCountryReady ? countryCode : null, token);

    return (
        <>
            <Container className='my-4 flex-grow-1'>
            <Notification variant='success'>City: {city} Selected</Notification>
            
            <Row className='align-items-center'>
                {/* Flag Section */}
                <Col xs={12} md={4} className='text-center mb-3'>
                    { isLoading ? <Spinner animation='border'/> : <FlagSection isLoading={isLoading} data={data} country={country} city={city} /> }
                </Col>

                {/* Grouped Coordinates and Weather */}
                <Col xs={12} md={8} className='d-flex flex-wrap justify-content-center gap-3'>
                    { isLoading ? <Spinner animation='border'/> : <CityDetails isLoading={isLoading} data={data} lat={lat} long={long} countryCode={countryCode} /> }
                    { weatherLoading ? <Spinner animation='border'/> : <CurrentWeatherWidget data={weatherData?.current} dtDiff={weatherData?.timezone_offset} city={city} isLoading={weatherLoading}/> }
                </Col>
            </Row>
            
            <Row className='align-items-center'>
                <Col className='text-center mb-3'>
                    { weatherLoading ? <Spinner animation='border'/> : <WeeklyWeather data={weatherData?.daily}/> }
                </Col>
            </Row> 

            <Row className='align-items-center'>
                { touristLoading ? <Spinner animation='border'/> : <POIList data={touristData?.features} city={city} countryCode={countryCode}/> }
            </Row>

            <Row className='align-items-center'>
                <Col className='text-center mb-3'>
                    <Map coord={coord} city={city} />
                </Col>
            </Row>
            
            </Container>
        </>
    )
}

// Prop Types for CityPageContents Component
CityPageContents.propTypes = { 
    city: PropTypes.string.isRequired, // City Name - Required
    country: PropTypes.string.isRequired, // Country Name - Required
    countryCode: PropTypes.string.isRequired, // Country Code - Required
    coord: PropTypes.arrayOf(PropTypes.number).isRequired, // Coordinates [lat, long] - Required
};

export default CityPageContents; // Export the CityPageContents Component