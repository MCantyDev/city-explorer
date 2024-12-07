/* Base Imports */
import { useRouteError, NavLink } from "react-router-dom";

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

/**
 * ErrorPage Component is used to render an Error Page when an error occurs in the application.
 * @returns {JSX.Element} - ErrorPage Component
 */
function ErrorPage() {
    let error = useRouteError() // get the Error Data from the Route

    // Return the ErrorPage Component JSX - A Very Simple Container with a Heading and a Button to go back to the Home Page
    return (
        <Container className="flex-grow-1 d-flex flex-column justify-content-center text-center">
            <section className="shadow-lg p-5">
                <h1>An Error Occurred!</h1>
                <p>{error.data}</p>
                <NavLink to={"/"} className="mt-3"><Button variant="danger" size="lg">Go to Home!</Button></NavLink>
            </section>
        </Container>
    )
}

export default ErrorPage;