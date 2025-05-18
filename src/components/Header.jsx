/* Base Imports */
import { useState } from 'react'
import './css/Header.css'

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Header Component is used to render the Header of the Application
 * @returns {JSX.Element} - Header Component
 */
function Header()
{
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) { return null; };

    const handleSignOut = () => {
        logout();
    };

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/sign-up');
    };
    
    return (
        <header>
            <Navbar className='bg-body-tertiary py-3 navbar'>
                <Container>
                    <Navbar.Brand href='/' className='navbar-brand'>City Explorer</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className='justify-content-end'>
                         <Navbar.Text className='navbar-text d-flex w-100 justify-content-end align-items-center'>
                            {user ? (
                                <>
                                    <p className='m-1 me-3'><span>{user.username}</span></p>
                                    <Button variant='outline-danger' size='sm' onClick={handleSignOut} className='m-1 py-2 px-4'>Sign Out</Button>
                                </>
                            ) : (
                                <>
                                    <Button className='m-1 py-2 px-4' variant='secondary' size='sm' onClick={handleLogin}>Login</Button>
                                    <Button className='m-1 py-2 px-4' variant='secondary' size='sm' onClick={handleSignUp}>Sign Up</Button>
                                </>
                            )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header; // Export the Header Component