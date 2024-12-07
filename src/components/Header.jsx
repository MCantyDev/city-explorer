/* Base Imports */
import { useState } from "react"
import "./css/Header.css"

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"

/**
 * Header Component is used to render the Header of the Application
 * @returns {JSX.Element} - Header Component
 */
function Header()
{
    // Pseudo Login Functionality 
    const user = "Mark Canty"; // User Name
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Logged In State
    const handleLoggedInState = () => { // Function to handle the Logged In State
        if (isLoggedIn) { 
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    };
    
    return (
        <header>
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
        </header>
    )
}

export default Header; // Export the Header Component