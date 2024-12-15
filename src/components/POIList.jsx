/* Base Imports */
import { useState } from 'react'
import PropTypes from 'prop-types'
import './css/POIList.css'

/* React-Bootstrap Imports */
import Col from 'react-bootstrap/Col'

/**
 * POIList Component is used to render the Point of Interest List
 * @param {object} props - data, api
 * @returns {JSX.Element} - POIList Component
 */
function POIList({ data, api }) {
    const [ currentXID, setCurrentXID ] = useState(null);
    const [ currentPOI, setCurrentPOI ] = useState(null);

    const handleClick = async (event) => {
        const xid = event.target.getAttribute('data-xid');

        if (xid === currentXID) {
            alert('Already Selected', xid);
            return;
        }

        setCurrentXID(xid);
        setCurrentPOI(await api.callOpenTripDetails(xid));
    }

    return (
        <>        
        <Col xs={12} md={8} className='text-center mb-3'>
            {currentPOI === null ? <h1>Select a Point of Interest</h1> : 
            <>
                    <h1>{currentPOI.name}</h1>
                    <figure className='fig'>
                        <img src={currentPOI.preview.source} alt={currentPOI.name} className='fig-img' width={400}/>
                        <figcaption className='fig-cap'>
                            <p>{currentPOI.address.road ? currentPOI.address?.house_number + ' ' + currentPOI.address.road : currentPOI.name} - {currentPOI.address.postcode}</p>
                            <p>{currentPOI.address.suburb}</p>
                            <p>{currentPOI.address.city}</p>
                        </figcaption>
                    </figure>

            </>
            }
        </Col>
        <Col xs={12} md={4} className='text-center mb-3 border-left'>
            <ul className='poi-list'>
                {data.map((poi, index) => {
                    return (
                        <li key={index}>
                            <button 
                            className='poi'
                            data-xid={poi.properties.xid}
                            onClick={handleClick}
                            >
                                {poi.properties.name}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </Col>
        </>

    )
}

POIList.propTypes = {
    data: PropTypes.array.isRequired,
    api: PropTypes.object.isRequired
};

export default POIList; // Export the POIList Component