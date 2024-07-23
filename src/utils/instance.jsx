import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
})
instance.interceptors.request.use()

export default instance