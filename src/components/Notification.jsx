import React, { useEffect, useState } from "react";
import "./css/Notification.css";

/* React-Bootstrap Imports */
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert";

// Notification is a component created to give feedback to user
function Notification({ variant = "danger", children}) {
    const [show, setShow] = useState(true)

    // Auto Dismiss after 4s
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);
    
    return (
        <Alert variant={variant} className="m-1 text-center" onClose={() => setShow(false)} dismissible show={show}>
            <p className="m-0 notification">{children}</p>
        </Alert>
    );
}

export default Notification;