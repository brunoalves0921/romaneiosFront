import axios from 'axios'
import { Agent } from 'https'


const api = axios.create({
    baseURL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
    httpsAgent: new Agent({
        rejectUnauthorized: false
    })
})

export default api
