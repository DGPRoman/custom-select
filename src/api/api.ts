import axios from "axios";
import {config} from "../config";

/**
 * Creates and exports an axios instance configured with the API's base URL and headers.
 */
export const api = axios.create({
    baseURL: config.API_URL,
    headers: {
        "X-Parse-Application-Id": config.API_ID,
        "X-Parse-Master-Key": config.API_KEY,
    },
});
