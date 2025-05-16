import { useEffect, useState } from 'react';
import { GetUsers } from '../../server-communicator/ServerCommunicator';

/* React Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import EditUserDetailsModal from './modals/EditUserModal';
import Notification from '../Toasts';
import AddUserModal from './modals/AddUserModal';

function UserTable({ setActiveSection, token }) {
	const [users, setUsers] = useState([]);
	const [selectedRow, setSelectedRow] = useState(null);
	const [showAddUser, setShowAddUser] = useState(false);

	// Notification Toast
	const [showToast, setShowToast] = useState(false);
	const [hText, setHText] = useState('');
	const [bText, setBText] = useState('');

	useEffect(() => {
		const getData = async () => {
			const data = await GetUsers(token);
			setUsers(data.result);
		};
		getData();
	}, [token]);

	const handleRefresh = async () => {
		const data = await GetUsers(token);
		setUsers(data.result);
	};

	return (
		<Container className="my-4">
			<Row className="mb-3">
				<Col>
					<h3>User Accounts</h3>
				</Col>
				<Col>
					<ButtonGroup>
						<Button onClick={() => setActiveSection('users')}>Users</Button>
						<Button onClick={() => setActiveSection('countries')}>Countries</Button>
						<Button onClick={() => setActiveSection('weather')}>Weather</Button>
						<Button onClick={() => setActiveSection('sights')}>Sights</Button>
						<Button onClick={() => setActiveSection('poi')}>POIs</Button>
					</ButtonGroup>
				</Col>
				<Col className="text-end">
					<ButtonGroup>
						<Button variant="primary" onClick={() => { setShowAddUser(true) }}>Add User</Button>
						<Button onClick={handleRefresh}>Refresh</Button>
					</ButtonGroup>
				</Col>
			</Row>

			<Table striped bordered hover responsive>
				<thead>
					<tr className="table-dark">
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Admin</th>
						<th>Created At</th>
						<th>Updated At</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(users) && users.length > 0 ? (
						users.map(user => (
							<tr
								key={user?.Id}
								onClick={() => setSelectedRow(user)}
								style={{ cursor: 'pointer' }}
								className="table-light">
								<td>{user?.FirstName}</td>
								<td>{user?.LastName}</td>
								<td>{user?.Username}</td>
								<td>{user?.Email}</td>
								<td>
									{user?.IsAdmin ? (
										<Badge bg="success">Yes</Badge>
									) : (
										<Badge bg="secondary">No</Badge>
									)}
								</td>
								<td>{new Date(user?.CreatedAt).toLocaleString()}</td>
								<td>{new Date(user?.UpdatedAt).toLocaleString()}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="8" className="text-center text-muted">
								No data available.
							</td>
						</tr>
					)}
				</tbody>
			</Table>

			<EditUserDetailsModal show={!!selectedRow} onHide={() => setSelectedRow(null)} selectedUser={selectedRow} showToast={setShowToast} toastHeader={setHText} toastBody={setBText} refresh={handleRefresh} />
			<AddUserModal show={showAddUser} onHide={() => setShowAddUser(false)} showToast={setShowToast} toastHeader={setHText} toastBody={setBText} refresh={handleRefresh} />
			<Notification show={showToast} onClose={() => setShowToast(false)} headerText={hText} bodyText={bText} />
		</Container>
	);
}

export default UserTable;
