/* Base Imports */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import propTypes from 'prop-types';

// Custom Icon for Map
const customIcon = new L.Icon({
    iconUrl: '/marker-icon-2x.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: '/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

/**
 * Map Component to display a map with a marker
 * @param {object} props - Coordinates [lat, long], City Name, Country Name
 * @returns {JSX.Element} - Map Component
 */
function Map({ coord = [53, -2], city = 'Manchester', country = 'United Kingdom' }) {
    return (
        <section className='mt-3 py-2 border shadow-sm d-flex align-items-center justify-content-center'>
            <MapContainer
            className='m-3'
            center={[coord[1], coord[0]]}
            zoom={9}
            minZoom={13}
            style={{ width : '100%', height: '450px'}}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[coord[1], coord[0]]} icon={customIcon}>
                    <Popup>
                        The City of {city} in {country}!
                    </Popup>
                </Marker>
            </MapContainer>
        </section>
    );
}

// Prop Types for Map Component - Default Values are set so that the component can be used without props
Map.propTypes = {
    coord: propTypes.arrayOf(propTypes.number), // Coordinates [lat, long]
    city: propTypes.string, // City Name
    country: propTypes.string // Country Name
};

export default Map; // Export the Map Component
