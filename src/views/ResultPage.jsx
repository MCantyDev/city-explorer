/* Base Imports */
import { useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';

/* Custom Component Imports */
import Header from '../components/Header';
import Footer from '../components/Footer';
import InlineSearchBar from '../components/InlineSearchBar';
import ResultList from '../components/ResultList';
import SkipNavigation from '../components/SkipNavigation';

import { useAuth } from '../context/AuthContext';

/**
 * Custom Hook to extract searchQuery and results from state
 * @param {React.state} state - React State
 * @returns {Object} - Object containing searchQuery and results
 */
function useQueryData(state) {
    if (!state) {
        return { searchQuery : '', results : [] };
    }
    const { searchQuery, queryData: results } = state
    return { searchQuery, results };
}

/**
 * ResultPage Component is used to render the Search Results Page
 * @returns {JSX.Element} - ResultPage Component
 */
function ResultPage() {
    const { state } = useLocation(); // Get the state from the location
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
    const mainRef = useRef(null); // Create a reference to the main element

    const { searchQuery, results } = useQueryData(state); // Extract searchQuery and results from the state

    return (
        <>
            <Helmet>
                <title>Results - { searchQuery }</title>
            </Helmet>
            <SkipNavigation reference={mainRef}/>
            <Header />

            <main ref={mainRef} className='flex-grow-1 d-flex flex-column'>
                <Container>

                    <InlineSearchBar/>
                    <h1>Search Results</h1>
                    <ResultList data={results} navigate={navigate} />

                </Container>
            </main>

            <Footer />
        </>
    );
}

export default ResultPage;
