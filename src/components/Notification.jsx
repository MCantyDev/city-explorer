import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import './css/Notification.css';

/* React-Bootstrap Imports */
import Alert from 'react-bootstrap/Alert';

/**
 * React Hook to dismiss the Notification after 4s
 * @returns {Array} - Array containing the show state and setShow function
 */
function useDismiss() {
    const [show, setShow] = useState(true) // Set the initial state to true

    // Auto Dismiss after 4s using setTimeout
    useEffect(() => {
        const timer = setTimeout(() => {  // Set a timer to dismiss the notification after 4s
            setShow(false); // Set the show state to false
        }, 4000);

        return () => clearTimeout(timer); // Clear the timer when the component is unmounted
    }, [ show ]); // Dependency for the useEffect

    return [ show, setShow ]; // Return the show state and setShow function
}

/**
 * Notification Component to show a Notification with a message -> Uses react-bootstrap Variants
 * @param {object} props - Variant of the Notification, Children of the Notification 
 * @returns {JSX.Element} - Notification Component
 */
function Notification({ variant = 'danger', children}) {
    const [ show, setShow ] = useDismiss(); // Get the show state and setShow function from the useDismiss Hook
    
    return (
        <Alert variant={variant} className='text-center mt-0 mb-3' onClose={() => setShow(false)} dismissible show={show}>
            <p className='m-0 notification'>{children}</p>
        </Alert>
    );
}

// Prop Types for Notification Component
Notification.propTypes = {
    variant: propTypes.string, // Variant of the Notification
    children: propTypes.node.isRequired // Children of the Notification - Required
};

export default Notification; // Export the Notification Component