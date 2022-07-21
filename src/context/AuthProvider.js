import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const storagedAuth = localStorage.getItem('auth')
    const [auth, setAuth] = useState(storagedAuth ? JSON.parse(storagedAuth) : {})
    const logout = () => {
        localStorage.removeItem('auth')
        window.location.href = '/'
    }

    return <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>
}

export default AuthContext
