/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../context/AuthContext';

/**
 * Footer Component is used to render the Footer of the Application
 * @returns {JSX.Element} - Footer Component
 */
function Footer() {
    const { user } = useAuth();
    return (
        <footer className='bg-dark-subtle py-4 mt-4'>
            <Container className='text-center'>
                <Row className='align-items-center'>
                    <Col className='text-center' xs={12} md={6}>
                        <p className='mb-0'>&copy; 2024 - Mark Canty</p>
                    </Col>
                    <Col className='d-flex flex-column justify-content-end text-center' xs={12} md={6}>
                        <p className='mb-0'>Pages:</p>
                        <a href='#' className='ms-2 text-dark'>Contact Us</a>
                        <a href='#' className='ms-2 text-dark'>About Us</a>
                        {user?.isAdmin ? (
                                <><a href='/admin' className='ms-2 text-dark'>Admin Panel</a></>
                            ) : ( <> </> )}
                    </Col>
                </Row>
                <a href='https://www.flaticon.com/free-icons/search' className='ms-2 text-dark' title='search icons'>Icon created by Freepik</a>
            </Container>
        </footer>
    );
}

export default Footer;