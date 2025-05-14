import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { baseServerURL } from '../config/ApiConfig';

function SignUpForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ error, setError ] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(baseServerURL + "signup", { // Need to Adjust to take the server's main URL component from a .env (so it is hotswappable)
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    first_name: firstName,
                    last_name: lastName,
                    username: username,
                    email: email, 
                    password: password }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }
            const data = await response.json();
            login(data.token);
            setError('');
            navigate('/');
            
        } catch (err) {
            setError(err.message);
        }
    };


    // Needs to be cleaned up but is functional
    return (
        <Container className="my-5">
            <h2 className="text-center">Sign Up To City Explorer</h2>
            <Form onSubmit={handleSubmit} className="mt-4">
                {/* First Name / Last Name Pair */}
                <Form.Group>
                    <Row>
                        <Col xs={12} md={6} className="mb-3"> {/* xs=12 for full width on small screens, md=6 for half width on larger screens */}
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                autoComplete="first-name"
                                required
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                autoComplete="last-name"
                                required
                            />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Username */}
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                    />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </Form.Group>

                {/* Password / Confirm Password Pair */}
                <Form.Group>
                    <Row>
                        <Col xs={12} md={6} className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="none"
                                required
                            />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Submit Button */}
                <Button variant="secondary" type="submit" className="w-100 mt-3">
                    Sign Up
                </Button>

                {/* Error Message */}
                {error && <p className="text-danger mt-3">{error}</p>}
            </Form>
        </Container>
    );
}

export default SignUpForm;
