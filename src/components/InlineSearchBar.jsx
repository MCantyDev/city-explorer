import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/SearchBar.css"

/* React-Bootstrap Imports */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ApiController from "../controllers/ApiController";

function InlineSearchBar() {
    const navigate = useNavigate();
    const api = new ApiController();

    const [ searchQuery, setSearchQuery ] = useState("");
    const [ queryData, setQueryData ] = useState([]);

    const ApiCall = async () => {
        const data = await api.callPhoton(searchQuery);
        
        if (data.features.length === 0) {
            return;
        }
        
        setQueryData(data.features);
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
       //  navigate("/search", { state : { data : queryData } });
        setSearchQuery("");
        
    };

    useEffect(() => {
        if (queryData.length > 0) {
            navigate("/search", { state : {searchQuery : searchQuery, queryData : queryData }})
            setQueryData([]);
        }
    })

    return (
        <Form className="text-center mb-3 mt-3" onSubmit={handleSubmit}>
            <Row className="align-items-center">
                <Col xs={12} md={9} className="mb-2">
                    <Form.Group className="d-flex">
                        <Form.Label htmlFor="inputSearch" className="visually-hidden">Search</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search for Country"
                            size="lg"
                            id="inputSearch"
                            value={searchQuery}
                            onChange={handleInputChange}
                            aria-describedby="inputSearchHelp"
                            className="w-100"
                        />
                        <Form.Text id="inputSearchHelp" muted className="visually-hidden">
                            Search for a country around the world using this search box
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} className="mb-2">
                    <Button className="btn-lg w-100" variant="secondary" onClick={handleSubmit}>Search</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default InlineSearchBar;