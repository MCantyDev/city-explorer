import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/ResultPage.css"

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container";

/* Import Custom Components */
import Header from "../components/Header";
import Footer from "../components/Footer";
import InlineSearchBar from "../components/InlineSearchBar";
import useCityNavigation from "../hooks/useCityNavigation";
import SkipNavigation from "../components/SkipNavigation";

function useQueryData(state) {
    if (!state) {
        return { searchQuery : "", results : [] };
    }
    const { searchQuery, queryData: results } = state
    console.log(results)
    return { searchQuery, results };
}

function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const mainRef = useRef(null);

    const { searchQuery, results } = useQueryData(state);
    const handleCityChoice = useCityNavigation(navigate);
    return (
        <>
            <Helmet>
                <title>Results - { searchQuery }</title>
            </Helmet>
            <SkipNavigation reference={mainRef}/>
            <Header />
            <main ref={mainRef} className="flex-grow-1 d-flex flex-column">
                <Container>
                <InlineSearchBar />
                    { results.length === 0 ? (
                        <h2>No results found</h2>
                    ) : (
                        <>
                            <h1>Search Results</h1>
                            <ul className="result-list">
                                {results.map((result, index) => (
                                    <li key={index}>
                                        <button
                                            className="w-100 result" 
                                            aria-label={"Go to " + result.properties.name + ", " + result.properties.country + " page"}
                                            data-city={result.properties.name}
                                            data-country={result.properties.country}
                                            data-code={result.properties.countrycode}
                                            data-coord={JSON.stringify(result.geometry.coordinates)}
                                            onClick={handleCityChoice}>
                                                <strong>{result.properties.name}</strong> - {result.properties.state ? result.properties.state : "No State"} - {result.properties.country}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default ResultPage;
