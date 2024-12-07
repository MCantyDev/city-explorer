/* Base Imports */
import { useMemo } from "react"
import PropTypes from 'prop-types';

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

/* Custom Component Imports */
import WeatherWidget from "./WeatherWidget";
import Notification from "./Notification";
import Map from "./Map";

/* Custom Controller Import */
import ApiController from "../controllers/ApiController";

/* Custom Hook Imports */
import useCountryData from "../hooks/useCountryData";
import { useWeatherData } from "../hooks/useWeatherData";
/**
 * CityPageContents Component is used to render the City Page Contents
 * @param {object} props - City, Country, Country Code and Coordinates 
 * @returns {JSX.Element} - CityPageContents Component
 */
function CityPageContents({ city, country, countryCode, coord }) {
    const [ long, lat ] = coord; // Destructure the Coordinates into long and lat - [long, lat]

    const api = useMemo(() => new ApiController(), []); // Create a new instance of the ApiController using useMemo

    const { data, isLoading } = useCountryData(countryCode, api); // Get the Country Data using the useCountryData hook
    const { data: weatherData, isLoading: weatherLoading } = useWeatherData(lat, long, api); // Get the Weather Data using the useWeatherData hook

    return (
        <>
            <Container className="my-4 flex-grow-1">
            <Notification variant="success">City: {city} Selected</Notification>
            
            <Row className="align-items-center">
                {/* Flag Section */}
                <Col xs={12} md={4} className="text-center mb-3">
                    {isLoading ? (
                        <Spinner animation="border" />
                    ) : (
                        <img src={data.flag} alt={"Flag of " + country} className="img-fluid rounded shadow" />
                    )}
                    <h1 className="mt-3">{city}</h1>
                    <h2 className="text-muted">{country}</h2>
                </Col>

                {/* Grouped Coordinates and Weather */}
                <Col xs={12} md={8} className="d-flex flex-wrap justify-content-center gap-3">
                   <section className="d-flex flex-column p-3 border shadow-sm text-center align-items-center justify-content-center" style={{ maxWidth: '400px', width: '100%' }}>
                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : (
                            <>
                                <h3 className="mb-3 ">Details</h3>
                                <p><strong>Latitude:</strong> {lat}</p>
                                <p><strong>Longitude:</strong> {long}</p>
                                <p><strong>Country Code:</strong> {countryCode}</p>
                                {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
                                <p><strong>Currency:</strong> {data.currencies.map((currency) => `(${currency.symbol}) ${currency.name}`)}</p>
                                {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join */}
                                <p><strong>{data.languages.length === 1 ? "Language:" : "Languages:"}</strong> {data.languages.join(", ")}</p>
                            </>
                        )}
                    </section>
                    { weatherLoading ? ( <></> ) :
                    (
                        <WeatherWidget data={weatherData.current} dtDiff={weatherData.timezone_offset} city={city}/>
                    )}
                </Col>
            </Row>
            <Map coord={coord} city={city} />
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