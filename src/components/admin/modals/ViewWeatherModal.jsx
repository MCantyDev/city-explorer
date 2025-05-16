import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import ConfirmPopover from '../../ConfirmPopover';
import CopyableText from '../../CopyableText';
import Text from '../../Text';

import { useAuth } from '../../../context/AuthContext';
import { DeleteCityWeather, RefreshCityWeather } from '../../../server-communicator/ServerCommunicator';

function ViewWeatherModal({ show, onHide, data, showToast, toastHeader, toastBody, refresh }) {
    const { token, loading } = useAuth();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    if (loading) { return null; }

    const handleRefresh = async () => {
        const response = await RefreshCityWeather(data?.IsoCode, token)
        if (response.error) {
            toastHeader('Failed')
            toastBody(response.error)
        } else {
            toastHeader('Success')
            toastBody('Successfully refreshed City Weather Report for ' + data?.CityName)
        }
        onHide()
        showToast()
        refresh()
    }

    const handleDelete = async () => {
        const response = await DeleteCityWeather(data?.Id, token);
        if (response.error) {
            toastHeader('Failed')
            toastBody(response.error)
        } else {
            toastHeader('Success')
            toastBody('Successfully deleted City Weather Report for ' + data?.CityName)
        }

        setShowDeleteConfirm(false);
        onHide();
        showToast(true);
        refresh();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>View City Weather Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Text label="City" value={data?.CityName} />
                <Text label="Country" value={data?.CountryName} />
                <Text label="Latitude" value={data?.Lat} />
                <Text label="Longitude" value={data?.Lon} />
                <CopyableText label="Formatted JSON Data (Click to Copy)" value={JSON.stringify(data?.Data)} />
                <Text label="Initial Creation" value={data?.CreatedAt} />
                <Text label="Last Update" value={data?.UpdatedAt} />
                <Text label="Expires" value={data?.ExpiryDate} />
            </Modal.Body>
            <Modal.Footer className='justify-content-between'>
                <OverlayTrigger
                    trigger="click"
                    show={showDeleteConfirm}
                    placement="right"
                    overlay={
                        <ConfirmPopover
                            onCancel={() => { setShowDeleteConfirm(false) }}
                            onConfirm={handleDelete}
                        />
                    }
                >
                    <Button variant="danger" onClick={() => { setShowDeleteConfirm(true) }}>Delete</Button>
                </OverlayTrigger>
                <div>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant="primary" onClick={handleRefresh} className='ms-3'>Refresh Data</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewWeatherModal;
