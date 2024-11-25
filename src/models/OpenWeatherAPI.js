import { OpenWeatherConfig } from "../config/ApiConfig";
import axios from "axios";

class OpenWeatherAPI {
    constructor() {
        this.baseUrl = OpenWeatherConfig.baseUrl;
    }

    async callApi(latitude, longitude) {

    }
}