import axios from 'axios'

const api = axios.create({
    baseURL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
})

export default api
