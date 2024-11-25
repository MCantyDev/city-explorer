import React, { useState, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./css/CityPage.css"

/* React-Bootstrap Imports */
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

/* Import Custom Components */
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notification from "../components/Notification";
import SkipNavigation from "../components/SkipNavigation";
import WeatherWidget from "../components/WeatherWidget";
import ApiController from "../controllers/ApiController";

// More Correct Way of Structuring pages according to S.O.L.I.D principles. Need to change rest of pages and components to adhere to this
// See https://medium.com/@yuvrajkakkar1/mastering-solid-principles-in-react-functional-components-4f5121f59551#:~:text=Implementing%20SOLID%20principles%20in%20React,manage%2C%20and%20adaptable%20to%20change.
function useCityNavigation(state, navigate) {
    useEffect(() => {
        if (!state?.sentFromResult) {
            navigate("/", { state : { error : "Use Search to navigate to chosen City page"}});
        }
    }, [ state, navigate ])
}

function useCoordinates(state) {
    return state?.coordinates ? JSON.parse(state.coordinates) : [];
}

function useCountry(state) {
    return state?.country;
}

function useApi(searchQuery, ApiController) {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            try {
                const result = await ApiController.callRestCountries(searchQuery);
                setData(result);
            } catch (error) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        performSearch()
    }, [ searchQuery ]);
    
    return { data, error, isLoading }
}

function CityPageContents({ city, country, countryCode, coord }) {
    const api = new ApiController();
    const { data, error, isLoading } = useApi(countryCode, api);
    console.log(data);


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
                    <img src={data.flags.png} alt={"Flag of " + country} className="img-fluid rounded shadow" />
                )}
                <h1 className="mt-3">{city}</h1>
                <h2 className="text-muted">{country}</h2>
                </Col>

                {/* Coordinates Section */}
                <Col xs={12} md={4} className="mb-3">
                <Card className="p-3">
                    <h4 className="mb-3">Coordinates</h4>
                    <p><strong>Latitude:</strong> {coord[1]}</p>
                    <p><strong>Longitude:</strong> {coord[0]}</p>
                </Card>
                </Col>

                {/* Weather Widget Section */}
                <Col xs={12} md={4} className="mb-3">
                    <WeatherWidget />
                </Col>
            </Row>

            <Button href="/" variant="primary" className="mt-4 w-100">Go To Home</Button>
            </Container>
        </>
    )
}

function CityPage()
{   
    const navigate = useNavigate();
    const { state } = useLocation();
    const main = useRef(null);
    let { countryCode, city } = useParams();

    const coord = useCoordinates(state);
    const country = useCountry(state);
    useCityNavigation(state, navigate);
    
    return (
        <>
            <Helmet>
                <title>{city} - {country}</title>
            </Helmet>
            <SkipNavigation reference={main}/>
            <Header />
            <main ref={main} className="d-flex flex-grow-1 flex-column">
                <CityPageContents city={city} country={country} countryCode={countryCode} coord={coord} />
                <Footer />
            </main>
        </>
    );
}

export default CityPage;