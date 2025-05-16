/* Base React Imports */
import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import ConfirmPopover from '../../ConfirmPopover';
import { DeleteUser, EditUser } from '../../../server-communicator/ServerCommunicator';
import { useAuth } from '../../../context/AuthContext';

// Messy but....Functional (running out of time)
function EditUserDetailsModal({ show, onHide, selectedUser, showToast, toastHeader, toastBody, refresh }) {
    const { user, token, loading } = useAuth();

    if (loading) { return null }

    const [formData, setFormData] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        is_admin: false,
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                id: selectedUser.Id || 0,
                first_name: selectedUser.FirstName || '',
                last_name: selectedUser.LastName || '',
                username: selectedUser.Username || '',
                email: selectedUser.Email || '',
                password: '',
                is_admin: selectedUser.IsAdmin || false,
            });
        }
    }, [selectedUser]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target; // deconstructing the required data from event.target
        setFormData(prev => ({
            ...prev, // Copy all previous values (Needed to keep track of "Admin Status")
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        const data = await EditUser(formData, token)
        if (data.error) {
            toastHeader('Failed')
            toastBody(data.error)
        } else {
            toastHeader('Success')
            toastBody('Successfully editted user - ' + selectedUser.Username)
        }
        refresh()
        showToast()
        onHide()
    }

    const confirmDelete = async () => {
        if (selectedUser.Id == user.id) { // Cannot delete Self
            setShowDeleteConfirm(false);
            toastHeader('Failed')
            toastBody('Cannot delete account logged into')
        } else {
            await DeleteUser(selectedUser.Id, token);
            toastHeader('Success')
            toastBody('Successfully deleted user - ' + selectedUser.Username)
        }

        refresh();
        setShowDeleteConfirm(false);
        showToast(true);
        onHide();
    }

    if (!user) { return null };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User Details</Modal.Title>
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
                <div style={{ position: 'relative', marginTop: '20px' }}>
                    <OverlayTrigger
                        trigger="click"
                        show={showDeleteConfirm}
                        placement="right"
                        overlay={
                            <ConfirmPopover
                                onCancel={() => { setShowDeleteConfirm(false) }}
                                onConfirm={confirmDelete}
                            />
                        }
                    >
                        <Button variant="danger" onClick={() => { setShowDeleteConfirm(true) }}>Delete</Button>
                    </OverlayTrigger>
                </div>
                <div>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button onClick={handleSubmit} className="ms-3">Save</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserDetailsModal;