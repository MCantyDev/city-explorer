/* Communicate with Backend Server

Gives access to:
- Login Endpoint
- Sign Up Endpoint
- Get Cities Endpoint
- Get Country Endpoint
- Get City Weather Endpoint
- Get City Sights Endpoint

NOT A CLASS (All Functions that use Fetch API)
*/

import { baseServerURL } from "../config/AppConfig";

export async function Login(username, password) {

}

export async function SignUp(input) {

}

/* GetCities Function - Asynchronous Function -> Requires Login to be successful */
export async function GetCities(searchTerm, token) {
    const response = await fetch(baseServerURL + `/auth/get-cities?city=${encodeURIComponent(searchTerm)}`, { // Need to Adjust to take the server's main URL component from a .env (so it is hotswappable)
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

export async function GetCountry(countryCode, token) {
    const response = await fetch(baseServerURL + `/auth/get-country?country-code=${encodeURIComponent(countryCode)}`, { // Need to Adjust to take the server's main URL component from a .env (so it is hotswappable)
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

export async function GetCityWeather(lat, long, token) {
    const response = await fetch(baseServerURL + `/auth/get-city-weather?lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(long)}`, { // Need to Adjust to take the server's main URL component from a .env (so it is hotswappable)
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

export async function GetCitySights(lat, long, token) {
    const response = await fetch(baseServerURL + `/auth/get-city-sights?lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(long)}`, { // Need to Adjust to take the server's main URL component from a .env (so it is hotswappable)
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

export async function GetCityPOI(xid, token) {
    const response = await fetch(baseServerURL + `/auth/get-city-poi?xid=${encodeURIComponent(xid)}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}