/* Base Imports */
import PropTypes from 'prop-types';

/* React-Bootstrap Imports */
import Card from 'react-bootstrap/Card';

function WeeklyWeather({ data }) {
    return (
        <Card className='my-3 py-2 border shadow-sm text-center'>
            <h3 className='my-2'>Weekly Weather Forecast</h3>
            <section className='d-flex flex-wrap justify-content-center gap-3 my-3'>
                {data.map((day, index) => {
                    const date = new Date(day.dt * 1000);
                    return (
                        <article key={index} className='text-center border shadow-sm p-3' style={{ minWidth: '130px' }}>
                            <p className='mb-0'>{date.toLocaleDateString('en-GB', { weekday: 'long' })}</p>
                            <p className='mb-0'>{date.toLocaleDateString('en-GB')}</p>
                            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].description} />
                            <p className='mb-0 text-muted'>{day.weather[0].description}</p>
                            <p className='mb-0'>Max: {Math.round(day.temp.max)}°C</p>
                            <p className='mb-0'>Min: {Math.round(day.temp.min)}°C</p>
                        </article>
                    )
                })}
            </section>
        </Card>
    )
}

WeeklyWeather.propTypes = {
    data: PropTypes.array.isRequired
};

export default WeeklyWeather;