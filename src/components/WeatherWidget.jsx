import React from 'react';
import "./css/WeatherWidget.css"

// Need to implement proper data gathering
function WeatherWidget() {
    const weatherData = {
        cityName: "Manchester",
        temperature: 13.4,
        icon: "04n",  // OpenWeatherMap icon code for broken clouds at night
        windSpeed: 3.6,
        humidity: 90,
        weatherCondition: "Broken clouds",
        date: "2024-11-22",  // Replace with actual date logic
        time: "22:00"
    }

    return (
        <div className="weather-box">
        <div className="weather-header">
            <img
            src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="weather-icon"
            className="weather-icon"
            />
            <h2 className="city-name">{weatherData.cityName}</h2>
        </div>
        <div className="weather-details">
            <p className="temp">{weatherData.temperature}°C</p>
            <p className="date">{weatherData.date}</p>
            <p className="time">{weatherData.time}</p>
            <p className="humidity">Humidity: {weatherData.humidity}%</p>
            <p className="weather-condition">{weatherData.weatherCondition}</p>
            <p className="wind-speed">Wind Speed: {weatherData.windSpeed} m/s</p>
        </div>
        </div>
    );
};

export default WeatherWidget;