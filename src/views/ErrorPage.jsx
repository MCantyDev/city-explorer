/* Base Imports */
import { useState, useEffect } from 'react';
import { useNavigate, useRouteError, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function useCountdown() {
    const [time, setTime] = useState(10);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    return { time };
}

function useNavigateHome(navigate) {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 10000);

        return () => clearTimeout(timer);
    }, [ navigate ]);
}

/**
 * ErrorPage Component is used to render an Error Page when an error occurs in the application.
 * @returns {JSX.Element} - ErrorPage Component
 */
function ErrorPage() {
    let error = useRouteError() // get the Error Data from the Route
    const navigate = useNavigate();

    const { time } = useCountdown(); // Use the useCountdown hook to countdown from 10 seconds
    useNavigateHome(navigate); // Use the useNavigateHome hook to navigate to the Home Page after 10 seconds

    const handleHome = () => {
        navigate('/')
    }

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
                    <Button variant='danger' size='lg' onClick={handleHome}>Go to Home!</Button>
                </section>
            </Container>
        </>
    )
}

export default ErrorPage;