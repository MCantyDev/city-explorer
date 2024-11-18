import React, { useState } from "react"
import "./css/Header.css"

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"

// Simple Header Component
function Header()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // No "Actual" Login Feature, just added for next Assignment
    const handleLoggedInState = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    };

    const user = "Mark Canty";
    

    return (
        <Navbar className="bg-body-tertiary py-3 navbar">
            <Container>
                <Navbar.Brand href="/" className="navbar-brand">City Explorer</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="navbar-text">
                        Signed in as: <button className="logged-state-button" onClick={handleLoggedInState}>{ isLoggedIn ? <span>{user}</span> : <span>Guest</span> }</button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;