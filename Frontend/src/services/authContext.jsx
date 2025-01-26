import { createContext, useEffect, useState, useContext } from 'react'
import axios from 'axios'
const SERVER_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/checkAuth`, { withCredentials: true })
                if (response.data.success) {
                    setIsLoggedIn(true)
                    setUser(response.data.user)
                } else{
                    setIsLoggedIn(false)
                    setUser(null)
                }
            } catch (error) {
                setIsLoggedIn(false)
                setUser(null)
            }
        }
        checkAuthStatus()
    }, [])

    return (
        <AuthContext.Provider value={{isLoggedIn, user}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }