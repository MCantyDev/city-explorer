import React from "react"
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

/* React Bootstrap Imports */
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/* Import Custom Components */
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function CityPage()
{
    const { state } = useLocation();
    const city = state?.cityName;
    
    function Capitilise(word) {
        const capitilise = word.charAt(0).toUpperCase() + word.slice(1); 
        return capitilise;
    };

    return (
        <>
            <Helmet>
                <title>Search - {Capitilise(city)}</title>
            </Helmet>
            <Header />
            <Container className="flex-grow-1 text-center">
                <h1>Hello, This is {Capitilise(city)} Page</h1>
                <Button href="/">Go To Home</Button>
            </Container>
            <Footer />
        </>
    );
}

export default CityPage;