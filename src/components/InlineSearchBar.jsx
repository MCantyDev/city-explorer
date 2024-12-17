/* Base Imports */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/SearchBar.css'

/* React-Bootstrap Imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

/**
 * InlineSearchBar Component is used to render an Inline Search Bar ( A search bar with a button to search side by side ) 
 * @param {Object} props - apiController
 * @returns {JSX.Element} - InlineSearchBar Component
 */
function InlineSearchBar({ api }) {
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

    const [ searchQuery, setSearchQuery ] = useState(''); // State to store the search query
    const [ queryData, setQueryData ] = useState([]); // State to store the search results
    const [ isLoading, setIsLoading ] = useState(false); // State to store the loading state

    /**
     * Function to perform a search using the Photon API
     * @returns {Promise<void>} Promise that resolves when the search is done
     */
    const performSearch = async () => { 
        try {     
            setIsLoading(true); // Set the loading state to true
            const data = await api.callPhoton(searchQuery); // Call the Photon API with the search query
            
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
            return; // Exit the function
        }
        // Perform the search
        performSearch();
    };

    // Use an effect to navigate to the search page when the queryData state changes
    useEffect(() => {
        // If there are results in the queryData state
        if (queryData.length > 0) {
            navigate('/search', { state : { searchQuery : searchQuery, queryData : queryData }}) // Navigate to the search page with the search query and results
            setQueryData([]); // Clear the queryData state
            setSearchQuery(''); // Clear the searchQuery state
        }
    }, [ navigate, searchQuery, queryData ]) // Depend on the queryData state

    return (
        <>
            <Form className='text-center mb-3 mt-3' onSubmit={handleSubmit}>
                <Row className='align-items-center'>
                    <Col xs={12} md={9} className='mb-2'>
                        <Form.Group className='d-flex'>
                            <Form.Label htmlFor='inputSearch' className='visually-hidden'>Search</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Search for City'
                                size='lg'
                                id='inputSearch'
                                value={searchQuery}
                                onChange={handleInputChange}
                                aria-describedby='inputSearchHelp'
                                className='w-100'
                            />
                            <Form.Text id='inputSearchHelp' muted className='visually-hidden'>
                                Search for a country around the world using this search box
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='mb-2'>
                        <Button className='btn-lg w-100' variant='secondary' onClick={handleSubmit}>{ isLoading ? <Spinner anim='border'/> : 'Search' }</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

InlineSearchBar.propTypes = {
    api: PropTypes.object.isRequired
}

export default InlineSearchBar;