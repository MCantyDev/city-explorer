import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container";

/* Import Custom Components */
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Notification from "../components/Notification";

function HomePage()
{
    const { state } = useLocation();
    const error = state?.error;

    return (
        // Fragments, used to not bloat the DOM structure with random unnecessary divs. Shorthand for <React.Fragment> + </React.Fragment>
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Header />
            <main className="flex-grow-1 d-flex flex-column">
                { 
                // If "error" create a Notification
                error ? 
                    <Notification variant="danger">{error}</Notification> : <></> 
                }
                <Container className="flex-grow-1 d-flex flex-column justify-content-center text-center">
                    <h1 className="page-title">City Explorer</h1>
                    <SearchBar />
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default HomePage;