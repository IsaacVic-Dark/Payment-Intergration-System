import axios from 'axios'
const SERVER_URL = import.meta.env.VITE_API_URL;

// Register Service
export const register = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${SERVER_URL}/register`, {
            name,
            email,
            password
        }, { withCredentials: true })
        return response
    } catch (error) {
        console.error('Error registering user', error.message)
    }
}

// Login Service
export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(`${SERVER_URL}/login`, {
            email,
            password
        }, { withCredentials: true })
        return response
    } catch (error) {
        return error.response
    }
}

// Logout Service
export const logout = async () => {
    try {
        const response = await axios.post(`${SERVER_URL}/logout`, {}, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        throw new Error('Couldn`t Logout')
    }
}
