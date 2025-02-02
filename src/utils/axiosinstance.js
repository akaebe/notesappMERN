import axios from "axios";
import { BASE_URL } from "./constants";
console.log("axios:", axios); // Add this line
const axiosinstance = axios.create({
    baseURL: BASE_URL,
    setTimeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosinstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default axiosinstance