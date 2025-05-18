import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(username, password);  // login now takes username, password directly
      setError('');
      navigate('/'); // or wherever you want after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center">Login To City Explorer</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
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

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </Form.Group>

        <Button variant="secondary" type="submit" className="w-100 mt-3">
          Login
        </Button>

        {error && <p className="text-danger mt-3">{error}</p>}
      </Form>
    </Container>
  );
}

export default LoginForm;
