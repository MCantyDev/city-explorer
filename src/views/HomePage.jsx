/* Base Imports */
import { useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';

/* Custom Components Imports */
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Notification from '../components/Notification';
import SkipNavigation from '../components/SkipNavigation';

/* Custom Controller Imports */
import ApiController from '../controllers/ApiController';

/**
 * Function to get the error from the state
 * @param {React.state} state - React State
 * @returns {String} - Error message
 */
function useError(state) {
    return state?.error;
}

/**
 * Home Page Component is used to render the Home Page
 * @returns {JSX.Element} - HomePage Component
 */
function HomePage()
{
    const { state } = useLocation(); // Get the state from the location
    const main = useRef(null); // Create a reference to the main element
    const error = useError(state) // Get the error from the state

    const api = useMemo(() => new ApiController(), []); // Create a new instance of the ApiController class with useMemo

    return (
        // Fragments, used to not bloat the DOM structure with random unnecessary divs. Shorthand for <React.Fragment> + </React.Fragment>
        <>
            <Helmet>    
                <title>Home</title>
            </Helmet>
            <SkipNavigation reference={main}/>
            <Header />

            <main ref={main} className='flex-grow-1 d-flex flex-column'>

                { 
                // If 'error' create a Notification
                error ? <Notification variant='danger'>{error}</Notification> : null }

                <Container className='flex-grow-1 d-flex flex-column justify-content-center text-center'>
                    <h1 className='page-title'>City Explorer</h1>
                    <SearchBar api={api}/>
                </Container>

            </main>

            <Footer />
        </>
    );
}

export default HomePage;