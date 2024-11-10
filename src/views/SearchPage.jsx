import React from "react"
import { Helmet } from "react-helmet-async";

/* React Bootstrap Imports */
import Button from "react-bootstrap/Button"

/* Import Custom Components */
import Header from "../components/Header";

function SearchPage()
{
    return (
        <>
            <Helmet>
                <title>Search Page</title>
            </Helmet>
            <Header />
            <h1>Hello, This is Search Page</h1>
        </>
    );
}

export default SearchPage;