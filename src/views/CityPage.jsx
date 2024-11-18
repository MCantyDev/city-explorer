import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";

/* React-Bootstrap Imports */
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/* Import Custom Components */
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notification from "../components/Notification";

/* Import Custom Hooks */
import useCityData from "../hooks/useCityData";

function CityPage()
{   
    /* Router DOM  */
    // Both Router things, needed for the App
    const { state } = useLocation();
    const navigate = useNavigate();

    let city = Capitilise(state?.cityName);
    let countryCode = state?.countryCode;
    const { data, loading, error } = useCityData(city, countryCode);
    
    /* Functions */
    function Capitilise(word) {
        const capitilise = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); 
        return capitilise;
    };

    useEffect(() => {
        if (loading) return; // Don't check redirect while loading

        if (!data || Object.keys(data).length === 0 || error) {
            let string = "Not Found Error: " + city + " not found in chosen country";
            navigate("/", { state : { error : string }}); // Redirect if city is not found
        }
    }, [data, loading, navigate]);

    return (
        <>
        <Helmet>
            <title>Search - {Capitilise(city)}</title>
        </Helmet>
        <Header />
        {loading ? // Ternary Just going to show "Loading..." or the page
            <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center"><h1>Loading...</h1></Container>
                :
            <>
                <Container className="flex-grow-1 text-center">
                    <Notification variant="success">City: {Capitilise(city)} found</Notification>
                    <h1>Hello, This is {Capitilise(city)} Page</h1>
                    <Button href="/">Go To Home</Button>
                </Container>
            </>
            }
        <Footer />
        </>
    );
}

export default CityPage;