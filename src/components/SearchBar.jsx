import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/SearchBar.css"

/* React Component Imports */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchBar() {
    const navigate = useNavigate();

    // Using States to capture the Form input Data
    const [ searchQuery, setSearchQuery ] = useState("");

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
        navigate("/search", { state : { cityName : searchQuery.toLowerCase() } });
        setSearchQuery("");
    };

    // Unlike handleSubmit handle random just navigates to a search with 
    const handleRandom = () => {
        if (confirm("Search for random city?")) {
            navigate("/search", { state : { cityName : "random" } });
            setSearchQuery("");
        }
    };

    return (
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
                <Form.Text id="inputSearchHelp" muted className="">
                    Search for a country around the world using this search box. Will display all relevant information that can be gathered using a few APIs.
                </Form.Text>
            </Form.Group>
            <Button className="btn-lg m-1 button" variant="secondary" onClick={handleSubmit}>Search</Button>
            <Button className="btn-lg m-1 button" variant="secondary" onClick={handleRandom}>Random</Button>
        </Form>
    );
}

export default SearchBar;