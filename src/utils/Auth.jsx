import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [userID, setUserID] = useState(sessionStorage.getItem('userID'))

    function login(userID) {
        sessionStorage.setItem('userID', userID)
        setUserID(sessionStorage.getItem('userID'))
    }
    function logout() {
        sessionStorage.clear()
    }
    return (
        <AuthContext.Provider value={{ userID, login, logout }}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}