import { Container } from 'react-bootstrap';
import { FaTachometerAlt } from 'react-icons/fa';

function DashboardHeader({ username }) {
  return (
    <Container className="mt-4">
      <div className="d-flex align-items-center">
        <FaTachometerAlt size={36} className="text-primary me-3" />
        <div className='w-100 text-center'>
          <h1 className="mb-0">Admin Dashboard</h1>
          {username && (
            <p className="text-muted mb-0">
              Welcome back, <strong>{username}</strong>!
            </p>
          )}
        </div>
      </div>
      <hr />
    </Container>
  );
}

export default DashboardHeader;
