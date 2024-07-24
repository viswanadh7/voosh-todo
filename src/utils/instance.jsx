import axios from "axios";

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${process.env.API_KEY}`
    }
})
instance.interceptors.request.use()

export default instance