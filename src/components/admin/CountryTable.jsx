/* React Imports */
import { useEffect, useState } from 'react';
import { GetCountries } from '../../server-communicator/ServerCommunicator';

/* React Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import ViewCountryModal from './modals/ViewCountryModal';
import Notification from '../Toasts';


function truncateJSON(json, length = 70) {
	const jsonString = JSON.stringify(json);
	return jsonString.length > length
		? jsonString.substring(0, length) + '…'
		: jsonString;
}

function CountryTable({ setActiveSection, token }) {
	const [countries, setCountries] = useState([])
	const [selectedCountry, setSelectedCountry] = useState(null);

	// Notification Toast
	const [showToast, setShowToast] = useState(false);
	const [hText, setHText] = useState('');
	const [bText, setBText] = useState('');

	useEffect(() => {
		const getData = async () => {
			const data = await GetCountries(token);
			setCountries(data.result)
		};
		getData();
	}, [token]);

	const handleRefresh = async () => {
		const data = await GetCountries(token);
		setCountries(data.result)
	};

	return (
		<Container className="my-4">
			<Row className="mb-3">
				<Col>
					<h3>Countries</h3>
				</Col>
				<Col>
					<ButtonGroup>
						<Button onClick={() => { setActiveSection('users') }}>Users</Button>
						<Button onClick={() => { setActiveSection('countries') }}>Countries</Button>
						<Button onClick={() => { setActiveSection('weather') }}>Weather</Button>
						<Button onClick={() => { setActiveSection('sights') }}>Sights</Button>
						<Button onClick={() => { setActiveSection('poi') }}>POIs</Button>
					</ButtonGroup>
				</Col>
				<Col className="text-end">
					<ButtonGroup>
						<Button onClick={handleRefresh}>Refresh</Button>
					</ButtonGroup>
				</Col>
			</Row>

			<Table striped bordered hover responsive>
				<thead>
					<tr className="table-dark">
						<th>Name</th>
						<th>Iso Country Code</th>
						<th>Formatted JSON Data</th>
						<th>Initial Creation</th>
						<th>Last Update</th>
						<th>Expires</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(countries) && countries.length > 0 ? (
						countries.map((country) => (
							<tr key={country.Id}
								onClick={() => { setSelectedCountry(country) }}
								style={{ cursor: 'pointer' }}
								className="table-light">
								<td>{country?.Name}</td>
								<td>{country.IsoCode}</td>
								<td><span>{truncateJSON(country.Data)}</span></td>
								<td>{new Date(country.CreatedAt).toLocaleString()}</td>
								<td>{new Date(country.UpdatedAt).toLocaleString()}</td>
								<td>{new Date(country.ExpiryDate).toLocaleString()}</td>
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

			<ViewCountryModal show={!!selectedCountry} onHide={() => setSelectedCountry(null)} data={selectedCountry} showToast={setShowToast} toastHeader={setHText} toastBody={setBText} refresh={handleRefresh} />
			<Notification show={showToast} onClose={() => setShowToast(false)} headerText={hText} bodyText={bText} />
		</Container>
	);
}

export default CountryTable;
