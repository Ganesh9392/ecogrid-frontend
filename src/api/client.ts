import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    // baseURL: "http://13.50.243.95/api",
    // baseURL: "https://ecogrid-api.duckdns.org/api",
});