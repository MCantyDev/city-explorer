/* Base Imports */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SearchBar.css'

/* React-Bootstrap Imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

/* Custom Controllers Imports */
import { useAuth } from '../context/AuthContext';
import { GetCities } from '../server-communicator/ServerCommunicator'

/**
 * Search Bar Component is used to render a Search Bar with a button to search
 * @returns {JSX.Element} - SearchBar Component
 */
function SearchBar() {
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
    const { token, loading } = useAuth();

    const [ searchQuery, setSearchQuery ] = useState('');  // State to store the search query
    const [ queryData, setQueryData ] = useState([]); // State to store the search results
    const [ isLoading, setIsLoading ] = useState(false); // State to store the loading state

    /**
     * Perform a search using the Photon API with the search query
     * @returns {Promise<void>} Promise that resolves when the search is done
     */
    const performSearch = async () => { 
        if (loading) { return; }
        try {     
            setIsLoading(true); // Set the loading state to true
            const data = await GetCities(searchQuery, token)

            // If no results are found, show an alert
            if (data.features.length === 0) {
                return alert('No Results found');
            }

            const filteredData = data.features.filter((feature) => (feature.properties.type === 'city')) // Filter the data to only show cities
            setQueryData(filteredData); // Set the filtered data to the state
        } catch (error) {
            console.error(error); // Log the error to the console
        } finally {
            setIsLoading(false); // Set the loading state to false
        }
    }

    // Function to handle the input change event
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value); // Set the search query to the value of the input
    };

    // Function to handle the form submit event
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission (page reload)

        // If the search query is empty, show an alert
        if (searchQuery.trim() === '') { 
            alert('Please enter a search term.');
            return;
        }

        performSearch(); // Perform the search
    };

    // UseEffect to navigate to the search page if queryData is not empty
    useEffect(() => {
        if (queryData.length > 0) {
            navigate('/search', { state : { searchQuery : searchQuery, queryData : queryData }}) 
            setQueryData([]); // Reset the queryData
            setSearchQuery(''); // Reset the searchQuery
        }
    }, [ navigate, searchQuery, queryData ]) // Dependencies for the useEffect

    return (
        <Form className='text-center mb-3' onSubmit={handleSubmit}>
            <Form.Group className='mb-2'>
                <Form.Label htmlFor='inputSearch' className='visually-hidden'>Search</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Search for City'
                    size='lg'
                    id='inputSearch'
                    value={searchQuery}
                    onChange={handleInputChange}
                    aria-describedby='inputSearchHelp'
                    className='mt-3 mb-2'
                ></Form.Control>
                <Form.Text id='inputSearchHelp' muted>
                    Search for a country around the world using this search box. Will display all relevant information that can be gathered using a few APIs.
                </Form.Text>
            </Form.Group>
            <Button className='btn-lg m-1 button w-50' variant='secondary' onClick={handleSubmit}>{ isLoading ? <Spinner anim='border'/> : 'Search' }</Button>
        </Form>
    );
}

export default SearchBar; // Export the SearchBar Component