/* Base Imports */
import { useState, useEffect } from 'react';
import { useNavigate, useRouteError, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function useCountdown() {
    const [time, setTime] = useState(10); // Set the time to 10 seconds

    // UseEffect to decrement the time by 1 every second
    useEffect(() => {
        const countdown = setInterval(() => {
            setTime(time - 1); // Decrement the time by 1 every second
        }, 1000);

        return () => clearInterval(countdown); // Clear the countdown interval when the component is unmounted
    }, [ time ]); // Dependency for the useEffect

    return { time }; // Return the time
}

function useNavigateHome() {
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

    // UseEffect to automatically navigate to the Home Page after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {  // Set a timer to automatically navigate to the Home Page after 5 seconds
            navigate('/');
        }, 10000);

        return () => clearTimeout(timer); // Clear the timer when the component is unmounted
    }, [ navigate ]); // Dependency for the useEffect
}

/**
 * ErrorPage Component is used to render an Error Page when an error occurs in the application.
 * @returns {JSX.Element} - ErrorPage Component
 */
function ErrorPage() {
    let error = useRouteError() // get the Error Data from the Route

    const { time } = useCountdown(); // Use the useCountdown hook to countdown from 10 seconds
    useNavigateHome(); // Use the useNavigateHome hook to navigate to the Home Page after 10 seconds

    // Return the ErrorPage Component JSX - A Very Simple Container with a Heading and a Button to go back to the Home Page
    return (
        <>
            <Helmet>
                <title>Error Occurred!</title>
            </Helmet>
            <Container className='flex-grow-1 d-flex flex-column justify-content-center text-center'>
                <section className='shadow-lg p-5'>
                    <h1>An Error Occurred!</h1>
                    {error?.data != null ? <p>{error?.data}</p> : <p>Something went wrong!</p> }
                    <p>Attempting to redirecting to Home in {time} {time > 1 ? 'seconds' : 'second' }...</p>
                    <NavLink to={'/'} className='mt-3'><Button variant='danger' size='lg'>Go to Home!</Button></NavLink>
                </section>
            </Container>
        </>
    )
}

export default ErrorPage;