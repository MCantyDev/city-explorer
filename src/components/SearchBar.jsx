import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/SearchBar.css"

/* React-Bootstrap Imports */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ApiController from "../controllers/ApiController";

function SearchBar() {
    const navigate = useNavigate();
    const api = new ApiController();

    const [ searchQuery, setSearchQuery ] = useState("");
    const [ queryData, setQueryData ] = useState([]);

    const ApiCall = async () => {
        const data = await api.callPhoton(searchQuery);
        
        if (data.features.length === 0) {
            return;
        }

        const filteredData = data.features.filter((feature) => (feature.properties.type === "city"))
        setQueryData(filteredData);
    }

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (searchQuery.trim() === '') {
            alert('Please enter a search term.');
            return;
        }
        ApiCall();
    };

    useEffect(() => {
        if (queryData.length > 0) {
            navigate("/search", { state : { searchQuery : searchQuery, queryData : queryData }})
            console.log(queryData);
            setQueryData([]);
            setSearchQuery("");
        }
    }, [ queryData ])

    return (
        <Form className="text-center mb-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
                <Form.Label htmlFor="inputSearch" className="visually-hidden">Search</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="Search for Country"
                    size="lg"
                    id="inputSearch"
                    value={searchQuery}
                    onChange={handleInputChange}
                    aria-describedby="inputSearchHelp"
                    className="mt-3 mb-2"
                ></Form.Control>
                <Form.Text id="inputSearchHelp" muted>
                    Search for a country around the world using this search box. Will display all relevant information that can be gathered using a few APIs.
                </Form.Text>
            </Form.Group>
            <Button className="btn-lg m-1 button w-50" variant="secondary" onClick={handleSubmit} >Search</Button>
        </Form>
    );
}

export default SearchBar;