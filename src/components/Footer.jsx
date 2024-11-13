import React from "react";

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/* Custom Component Imports */

function Footer() {
    return (
        <footer className="bg-body-tertiary py-4 mt-4">
            <Container>
                <Row className="align-items-center">
                    <Col className="text-center" xs={12} md={6}>
                        <p className="mb-0">&copy; 2024 - Mark Canty</p>
                    </Col>
                    <Col className="d-flex flex-column justify-content-end text-center" xs={12} md={6}>
                        <p className="mb-0">Pages:</p>
                        <a href="#" className="text-decoration-none ms-2">Contact Us</a>
                        <a href="#" className="text-decoration-none ms-2">About Us</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;