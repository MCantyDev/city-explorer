/* React Imports */
import { useEffect, useState } from 'react';
import { GetCitySightsTable } from '../../server-communicator/ServerCommunicator';

/* React Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import ViewSightsModal from './modals/ViewSightsModal';
import Notification from '../Toasts';

function truncateJSON(json, length = 70) {
    const jsonString = JSON.stringify(json);
    return jsonString.length > length
        ? jsonString.substring(0, length) + '…'
        : jsonString;
}

function CitySightsTable({ setActiveSection, token }) {
    const [sights, setSights] = useState([]);
    const [selectedSightList, setSelectedSightList] = useState(null);

    // Notification Toast
    const [showToast, setShowToast] = useState(false);
    const [hText, setHText] = useState('');
    const [bText, setBText] = useState('');

    useEffect(() => {
        const getData = async () => {
            const data = await GetCitySightsTable(token);
            setSights(data.result)
        };
        getData();
    }, [token]);

    const handleRefresh = async () => {
        const data = await GetCitySightsTable(token);
        setSights(data.result)
    };

    return (
        <Container className="my-4">
            <Row className="mb-3">
                <Col>
                    <h3>City Sights</h3>
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
                        <th>City</th>
                        <th>Country</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Data</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(sights) && sights.length > 0 ? (
                        sights.map((sight) => (
                            <tr key={sight.Id}
								onClick={() => { setSelectedSightList(sight) }}
								style={{ cursor: 'pointer' }}
								className="table-light">
                                <td>{sight?.CityName}</td>
                                <td>{sight?.CountryName}</td>
                                <td>{sight?.Lat}</td>
                                <td>{sight?.Lon}</td>
                                <td><span>{truncateJSON(sight?.Data)}</span></td>
                                <td>{new Date(sight?.CreatedAt).toLocaleString()}</td>
                                <td>{new Date(sight?.UpdatedAt).toLocaleString()}</td>
                                <td>{new Date(sight?.ExpiryDate).toLocaleString()}</td>
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
            <ViewSightsModal show={!!selectedSightList} onHide={() => setSelectedSightList(null)} data={selectedSightList} showToast={setShowToast} toastHeader={setHText} toastBody={setBText} refresh={handleRefresh} />
            <Notification show={showToast} onClose={() => setShowToast(false)} headerText={hText} bodyText={bText} />
        </Container>
    );
}

export default CitySightsTable;
