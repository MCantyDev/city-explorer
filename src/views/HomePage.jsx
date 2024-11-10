import React, { useEffect } from "react"
import { Helmet } from "react-helmet-async";
import "./css/HomePage.css"


/* React Bootstrap Imports */
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

/* Import Custom Components */
import Header from "../components/Header";

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

    return (
        // Fragments, used to not bloat the DOM structure with random divs. Shorthand for <React.Fragment> + </React.Fragment>
        <>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <Header />
            <Container>
                <h1 className="page-title">City Explorer</h1>
            </Container>
        </>
    );
}

export default HomePage;