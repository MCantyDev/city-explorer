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

async function fetchWithHandling(url, options) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            return { error: data.error || 'Server returned an error' };
        }

        return data;
    } catch {
        return { error: 'Lost connection to server' };
    }
}

// AUTH REQUIRED (Login Required)
export function GetProfile() {
    return fetchWithHandling(baseServerURL + `/auth/profile`, {
        method: 'GET',
        credentials: 'include',
    })
}

export function GetCities(searchTerm, token) {
    return fetchWithHandling(baseServerURL + `/auth/get-cities?city=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export function GetCountry(countryName, countryCode, token) {
    return fetchWithHandling(baseServerURL + `/auth/get-country?name=${encodeURIComponent(countryName)}&country-code=${encodeURIComponent(countryCode)}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export function GetCityWeather(lat, long, city, countryCode, token) {
    return fetchWithHandling(baseServerURL + `/auth/get-city-weather?lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(long)}&city=${encodeURIComponent(city)}&country-code=${encodeURIComponent(countryCode)}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export function GetCitySights(lat, long, city, countryCode, token) {
    return fetchWithHandling(baseServerURL + `/auth/get-city-sights?lat=${encodeURIComponent(lat)}&long=${encodeURIComponent(long)}&city=${encodeURIComponent(city)}&country-code=${encodeURIComponent(countryCode)}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export function GetCityPOI(xid, city, countryCode, token) {
    return fetchWithHandling(baseServerURL + `/auth/get-city-poi?xid=${encodeURIComponent(xid)}&city=${encodeURIComponent(city)}&country-code=${encodeURIComponent(countryCode)}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

// ADMIN GET TABLES
export function GetCountries(token) {
    return fetchWithHandling(baseServerURL + `/admin/get-countries`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
export function GetUsers(token) {
    return fetchWithHandling(baseServerURL + `/admin/get-users`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
export function GetCityWeatherTable(token) {
    return fetchWithHandling(baseServerURL + `/admin/get-city-weather`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
export function GetCitySightsTable(token) {
    return fetchWithHandling(baseServerURL + `/admin/get-city-sights`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
export function GetCityPoisTable(token) {
    return fetchWithHandling(baseServerURL + `/admin/get-city-pois`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

// ADMIN INTERACTABILITY
export function AddUser(user, token) {
    return fetchWithHandling(baseServerURL + `/admin/add-user`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
    });
}

export function EditUser(user, token) {
    return fetchWithHandling(baseServerURL + `/admin/edit-user`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
    });
}

export function RefreshCountry(countryCode, token) {
    return fetchWithHandling(baseServerURL + `/admin/refresh-country?country-code=${encodeURIComponent(countryCode)}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}
export function RefreshCityWeather(lat, lon, token) {
    return fetchWithHandling(baseServerURL + `/admin/refresh-city-weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}
export function RefreshCitySights(lat, lon, token) {
    return fetchWithHandling(baseServerURL + `/admin/refresh-city-sights?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}
export function RefreshCityPoi(xid, token) {
    return fetchWithHandling(baseServerURL + `/admin/refresh-sight-poi?xid=${encodeURIComponent(xid)}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

// Deletes
export function DeleteUser(id, token) {
    return fetchWithHandling(baseServerURL + `/admin/delete-user`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
    });
}
export function DeleteCountry(id, token) {
    return fetchWithHandling(baseServerURL + `/admin/delete-country`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
    });
}
export function DeleteCityWeather(id, token) {
    return fetchWithHandling(baseServerURL + `/admin/delete-city-weather`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
    });
}
export function DeleteCitySights(id, token) {
    return fetchWithHandling(baseServerURL + `/admin/delete-city-sights`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
    });
}
export function DeleteCityPoi(id, token) {
    return fetchWithHandling(baseServerURL + `/admin/delete-city-poi`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
    });
}


