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
    const { state } = useLocation(); // Get the state from the location
    const main = useRef(null); // Create a reference to the main element

    let { countryCode, city } = useParams(); // Get the countryCode and city from the URL

    const coord = useCoordinates(state); // Get the Coordinates from the state
    const country = useCountry(state); // Get the Country from the state
    
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