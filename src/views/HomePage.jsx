import React from "react";
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
    /*  
        Method took from StackOverflow
        https://stackoverflow.com/questions/46160461/how-do-you-set-the-document-title-in-react
        Mentioned "react-helmet" found "react-helmet-async" which is more useful for SSR which may be utilized in 2nd Term of project

    useEffect(() => {
        document.title = "Home Page";
    }, []);
    */
    const { state } = useLocation();
    const error = state?.error;

    return (
        // Fragments, used to not bloat the DOM structure with random divs. Shorthand for <React.Fragment> + </React.Fragment>
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Header />
            <Container>
            { error ? <Notification variant="danger">{error}</Notification> : <></> }
            </Container>
            <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                <h1 className="page-title">City Explorer</h1>
                <SearchBar />
            </Container>
            <Footer />
        </>
    );
}

export default HomePage;