import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/* React-Bootstrap Imports */
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/* Import Custom Components */
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notification from "../components/Notification";

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

function CityPageContents({ city, coord }) {
    return (
        <Container className="flex-grow-1 text-center">
            <Notification variant="success">City: {city} Selected</Notification>
            <h1>Hello, This is {city} Page</h1>
            <h2>Long: {coord[1]} & Lat: {coord[0]}</h2>
            <Button href="/">Go To Home</Button>
        </Container>
    )
}

function CityPage()
{   
    const navigate = useNavigate();
    const { state } = useLocation();
    let { country, city } = useParams();

    // https://api.opencagedata.com/geocode/v1/json?q=39.094719+-97.324746&key=633869f246384770899667a9deae3e45
    const coord = useCoordinates(state);
    useCityNavigation(state, navigate);

    return (
        <>
        <Helmet>
            <title>{city} - {country}</title>
        </Helmet>
        <Header />
        <CityPageContents city={city} coord={coord} />
        <Footer />
        </>
    );
}

export default CityPage;