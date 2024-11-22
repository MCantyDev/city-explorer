import { restCountriesConfig } from "../config/ApiConfig";
import axios from "axios";

class RestCountriesApi {
    constructor() {
        this.baseUrl = restCountriesConfig.baseUrl
    }

    callApi(countryCode) {
        if (!countryCode) {
            console.error("Invalid Input: CountryCode");
            return {};
        };
    }
}