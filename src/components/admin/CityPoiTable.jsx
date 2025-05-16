/* React Imports */
import { useEffect, useState } from 'react';
import { GetCityPoisTable } from '../../server-communicator/ServerCommunicator';

/* React Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import ViewPoiModal from './modals/ViewPOIModal';
import Notification from '../Toasts';

function truncateJSON(json, length = 70) {
    const jsonString = JSON.stringify(json);
    return jsonString.length > length
        ? jsonString.substring(0, length) + '…'
        : jsonString;
}

function CityPoiTable({ setActiveSection, token }) {
    const [pois, setPois] = useState([]);
    const [selectedPoi, setSelectedPoi] = useState(null);

    // Notification Toast
    const [showToast, setShowToast] = useState(false);
    const [hText, setHText] = useState('');
    const [bText, setBText] = useState('');

    useEffect(() => {
        const getData = async () => {
            const data = await GetCityPoisTable(token);
            setPois(data.result)
        };
        getData();
    }, [token]);

    const handleRefresh = async () => {
        const data = await GetCityPoisTable(token);
        setPois(data.result)
    };

    return (
        <Container className="my-4">
            <Row className="mb-3">
                <Col>
                    <h3>City Points of Interest</h3>
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
                        <Button>Refresh</Button>
                    </ButtonGroup>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr className="table-dark">
                        <th>City</th>
                        <th>Country</th>
                        <th>XID</th>
                        <th>Data</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(pois) && pois.length > 0 ? (
                        pois.map((poi) => (
                            <tr key={poi.Id}
                                onClick={() => { setSelectedPoi(poi) }}
                                style={{ cursor: 'pointer' }}
                                className="table-light">
                                <td>{poi?.CityName}</td>
                                <td>{poi?.CountryName}</td>
                                <td>{poi?.Xid}</td>
                                <td><span>{truncateJSON(poi?.Data)}</span></td>
                                <td>{new Date(poi?.CreatedAt).toLocaleString()}</td>
                                <td>{new Date(poi?.UpdatedAt).toLocaleString()}</td>
                                <td>{new Date(poi?.ExpiryDate).toLocaleString()}</td>
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
            <ViewPoiModal show={!!selectedPoi} onHide={() => setSelectedPoi(null)} data={selectedPoi} showToast={setShowToast} toastHeader={setHText} toastBody={setBText} refresh={handleRefresh} />
            <Notification show={showToast} onClose={() => setShowToast(false)} headerText={hText} bodyText={bText} />
        </Container>
    );
}

export default CityPoiTable;
