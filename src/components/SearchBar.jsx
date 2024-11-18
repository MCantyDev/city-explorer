import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/SearchBar.css"

/* React-Bootstrap Imports */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// Major Component of App
// Facilitates the Searching of Cities within any Country
// Going to Swap the Search from Second page to be done within "Search Bar" as it doesnt perform the "Search" as of yet
function SearchBar() {
    const navigate = useNavigate();

    // Using States to capture the Form input Data
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ selectedCountry, setSelectedCountry ] = useState("Select a Country");
    const [ countries, setCountries ] = useState([]);

    // handleInput takes the event target (in our case the Form.Control) value and just updates the searchQuery state
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // handleSubmit will use navigate to navigate to the search page with the Data
    const handleSubmit = () => {
        if (searchQuery.trim() === '') {
            alert('Please enter a search term.');
            return;  // Prevent navigation if empty
        }
        navigate("/search", { state : { cityName : searchQuery.toLowerCase(), countryCode : selectedCountry } });
        setSearchQuery("");
    };

    const handleChange = (event) => {
        setSelectedCountry(event.target.value)
    }

    // Unlike handleSubmit handle random just navigates to a search with 
    const handleRandom = () => {
        if (confirm("Search for random city?")) {
            navigate("/search", { state : { cityName : "random" } });
            setSearchQuery("");
        }
    };

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await fetch("/CountryCodes.json");
    
                if (!response.ok) {
                    throw new Error("Response Status: ${response.status}");
                }
    
                const json = await response.json();
                const data = Object.entries(json).map(([key, value]) => ({
                    code: key,
                    name: value
                }));
                setCountries(data);
            } catch (error) {
                console.error("Error:", error.message);
            }
        }

        fetchCountryData();
    })

    return (
        <Container className="custom-container">
            <Form className="text-center mb-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Label htmlFor="inputSearch" className="visually-hidden">Search</Form.Label>
                    <Form.Control 
                        type="text"
                        size="lg"
                        id="inputSearch"
                        value={searchQuery}
                        onChange={handleInputChange}
                        aria-describedby="inputSearchHelp"
                        className="mt-3 mb-2"
                        ></Form.Control>
                    <Form.Select 
                        aria-label="Country Selector"
                        value={selectedCountry}
                        onChange={handleChange}
                        className="mb-3"
                    >
                        <option value="Select a Country" disabled>Select a Country</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>{country.name}</option>
                        ))}
                    </Form.Select>
                    <Form.Text id="inputSearchHelp" muted>
                        Search for a country around the world using this search box. Will display all relevant information that can be gathered using a few APIs.
                    </Form.Text>
                </Form.Group>
                <Button className="btn-lg m-1 button" variant="secondary" onClick={handleSubmit}>Search</Button>
                <Button className="btn-lg m-1 button" variant="secondary" onClick={handleRandom}>Random</Button>
            </Form>
        </Container>
    );
}

export default SearchBar;