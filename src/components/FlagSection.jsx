/* Base Imports */
import propTypes from 'prop-types';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';

/**
 * FlagSection Component is used to render the Flag of the Country and the City Name
 * @param {Object} props - Data, Country, City
 * @returns {JSX.Element} - FlagSection Component
 */
function FlagSection({ data, country, city }) {
    return (
        <Container className='my-4 flex-grow-1'>
            <img src={data?.flag} alt={'Flag of ' + country} className='img-fluid rounded shadow' />
            <h1 className='mt-3'>{city}</h1>
            <h2 className='text-muted'>{country}</h2>
        </Container>
    );
}

FlagSection.propTypes = {
    data: propTypes.object.isRequired,
    country: propTypes.string.isRequired,
    city: propTypes.string.isRequired
};

export default FlagSection;