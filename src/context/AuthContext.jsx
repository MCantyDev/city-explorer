import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        
        if (storedToken != null) {
            try {
                const payload = splitToken(storedToken);
                const timeNow = Math.floor(Date.now() / 1000);
                
                if (payload.username === undefined || payload.id === undefined ||
                     payload.isAdmin === undefined || payload.exp === undefined) {
                    console.warn("Invalid Token: Missing Required Fields");
                    throw new Error('Invalid Token');
                }

                if (payload.exp < timeNow) {
                    console.warn("Token has expired");
                    sessionStorage.removeItem('token');
                    setUser(null);
                    setToken(null);
                    return;
                }

                setUser(payload);
                setToken(storedToken);
            } catch (error) {
                console.error("Error with Token:", error);
                sessionStorage.removeItem('token');
                setUser(null);
                setToken(null);
            }
        }

        setLoading(false);
    }, []);


    // Decode the token and return the payload
    const splitToken = (token) => {
        const parts = token.split('.');

        if (parts.length !== 3) { // Ensure the Token has 3 components
            throw new Error('Malformed Token')
        }

        try {
            return JSON.parse(atob(parts[1])); // Decoding Payload component of JWT Token
        } catch (error) {
            throw new Error('Invalid base64 payload');
        }
    }

    // Login function to store the token and update user (Do not need Sign Up function as after Sign Up is successful, Log the User in)
    const login = (token) => {
        sessionStorage.setItem('token', token);

        const payload = splitToken(token);
        setUser(payload);
        setToken(token);
        setLoading(false);
    };

    // Logout function to store the token and update user
    const logout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
        setToken(null);
        setLoading(false);
    };

    // Prvide the user, token, and login + logout functions in the Auth Context for easy access
    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);