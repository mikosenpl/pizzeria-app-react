import { default as ax } from 'axios'

const axios = ax.create({
    baseURL: '/api',
})

axios.interceptors.request.use((config) => {
    const storage = JSON.parse(localStorage.getItem('auth'))
    if (storage) {
        config.headers.Authorization = `Bearer ${storage.accessToken}`
    }

    return config
})

export default axios
