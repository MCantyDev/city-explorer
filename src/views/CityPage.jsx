/* React Imports */
import { useEffect, useMemo, useRef } from 'react'
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/* Custom Components Import */
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkipNavigation from '../components/SkipNavigation';
import CityPageContents from '../components/CityPageContent';

/**
 * Function to use the City Navigation Hook to navigate to the search page if user was not sent via the search bar
 * @param {React.state} state - React State
 * @param {React.navigate} navigate - React Navigate function
 */
function useCityNavigation(state, navigate) {
    useEffect(() => {
        if (!state?.sentFromResult) {
            navigate('/', { state : { error : 'Use Search to navigate to chosen City page'}});
        }
    }, [ state, navigate ])
}

/**
 * Function to get the Coordinates from the state
 * @param {React.state} state - React State
 * @returns {Array} - Array of Coordinates
 */
function useCoordinates(state) {
    return state?.coordinates ? JSON.parse(state.coordinates) : [];
}

/**
 * Function to get the Country from the state
 * @param {React.state} state - React State
 * @returns {String} - Country Name
 */
function useCountry(state) {
    return state?.country;
}

/**
 * City Page Component is used to render the City Page
 * @returns {JSX.Element} - CityPage Component
 */
function CityPage()
{   
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
    const { state } = useLocation(); // Get the state from the location
    const main = useRef(null); // Create a reference to the main element

    let { countryCode, city } = useParams(); // Get the countryCode and city from the URL

    const coord = useCoordinates(state); // Get the Coordinates from the state
    const country = useCountry(state); // Get the Country from the state
    useCityNavigation(state, navigate); // Use the useCityNavigation hook to navigate to the search page if the state is not set
    
    return (
        <>
            <Helmet>
                <title>{city} - {country}</title>
            </Helmet>
            <SkipNavigation reference={main}/>

            <Header />
            <main ref={main} className='d-flex flex-grow-1 flex-column'>
                <CityPageContents city={city} country={country} countryCode={countryCode} coord={coord} />
            </main>
            <Footer />
        </>
    );
}

export default CityPage;