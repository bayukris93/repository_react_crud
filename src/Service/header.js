import axios from "axios";

export const analytic = axios.create({
    baseURL: "http://localhost:3010",
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
    }
});