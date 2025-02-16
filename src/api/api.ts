import axios from "axios";
import {config} from "../config";

export const api = axios.create({
    baseURL: config.API_URL,
    headers: {
        "X-Parse-Application-Id": config.API_ID,
        "X-Parse-Master-Key": config.API_KEY,
    },
});
