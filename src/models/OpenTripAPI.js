import { OpenTripConfig } from "../config/ApiConfig";
import axios from 'axios';

class OpenTripAPI {
    constructor() {
        this.baseUrl = OpenTripConfig.baseUrl;
    }

    async getLocationsList(lat, long, rate=3) {
        let url = `${this.baseUrl}/places/radius?radius=2000&lon=${long}&lat=${lat}&kinds=amusements%2Caccomodations%2Ctourist_facilities&rate=${rate}&limit=50&apikey=${OpenTripConfig.apiKey}`;

        try {
            const response = await axios.get(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error Fetching Location Data', error);
            return {};
        }
    }

    async getLocationDetails(xid) {
        let url = `${this.baseUrl}/places/xid/${xid}?apikey=${OpenTripConfig.apiKey}`;

        try {
            const response = await axios.get(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error Fetching Location Data', error);
            return {};
        }
    }
}

export default OpenTripAPI;