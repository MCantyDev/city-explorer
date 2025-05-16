/* Base React Imports */
import { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

import { AddUser } from '../../../server-communicator/ServerCommunicator';
import { useAuth } from '../../../context/AuthContext';

// Messy but....Functional (running out of time)
function AddUserModal({ show, onHide, showToast, toastHeader, toastBody, refresh }) {
    const { token, loading } = useAuth();

    if (loading) { return null };

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        is_admin: false,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target; // deconstructing the required data from event.target
        setFormData(prev => ({
            ...prev, // Copy all previous values (Needed to keep track of "Admin Status")
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        const data = await AddUser(formData, token);
        if (data.error) {
            toastHeader('Failed');
            toastBody(data.error);
        } else {
            toastHeader('Success');
            toastBody('Successfully added user - ' + formData.username);
        };
        refresh();
        showToast();
        onHide();
        setFormData({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            is_admin: false,
        });
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="isAdminCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Is Admin"
                            name="is_admin"
                            checked={formData.is_admin}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='justify-content-between'>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button onClick={handleSubmit} className="ms-3">Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddUserModal;