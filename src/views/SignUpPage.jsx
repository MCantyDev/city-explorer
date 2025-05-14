/* Base Imports */
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';

/* Custom Component Imports */
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkipNavigation from '../components/SkipNavigation';
import SignUpForm from '../components/SignUpForm';


function LoginPage() {
    const mainRef = useRef(null); // Create a reference to the main element

    return (
        <>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <SkipNavigation reference={mainRef}/>
            <Header />

            <main ref={mainRef} className='flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
                <Container>
                    <SignUpForm />
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default LoginPage;
