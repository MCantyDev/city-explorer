import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/ResultPage.css"

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container";

/* Import Custom Components */
import Header from "../components/Header";
import Footer from "../components/Footer";
import InlineSearchBar from "../components/InlineSearchBar";

function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const searchQuery = state?.searchQuery;
    const results = state?.queryData;

    const handleCityChoice = (event) => {
        const city = event.target.dataset.name;
        const countryCode = event.target.dataset.code;
        const coordinates = event.target.dataset.coord;

        navigate(`/search/${countryCode}/${city}`, { state : { sentFromResult : true, coordinates : coordinates }})
    }

    return (
        <>
            <Helmet>
                <title>Results - { searchQuery }</title>
            </Helmet>
            <main className="flex-grow-1 d-flex flex-column">
                <Header />
                <Container>
                <InlineSearchBar />
                    { results.length === 0 ? (
                        <h2>No results found</h2>
                    ) : (
                        <ul className="result-list">
                            {results.map((result, index) => (
                                <button
                                    key={index}
                                    className="w-100 result" 
                                    data-name={result.properties.name}
                                    data-code={result.properties.countrycode}
                                    data-coord={JSON.stringify(result.geometry.coordinates)}
                                    onClick={handleCityChoice}
                                ><strong>{result.properties.name}</strong> - {result.properties.state} - {result.properties.country}</button>
                            ))}
                        </ul>
                    )}
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default ResultPage;
