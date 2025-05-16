import Toast from 'react-bootstrap/Toast';

function Notification({ show, onClose, headerText, bodyText }) {
    return (
        <Toast

            onClose={onClose}
            show={show}
            delay={5000}
            autohide
            style={{
                position: 'fixed',
                top: 20,
                right: 20,
                minWidth: '200px',
                zIndex: 1060,
            }}
        >
            <Toast.Header>
                <strong className="me-auto">{headerText}</strong>
            </Toast.Header>
            <Toast.Body>{bodyText}</Toast.Body>
        </Toast>
    );
}

export default Notification;