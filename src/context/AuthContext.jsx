import { createContext, useContext, useState, useEffect } from "react";
import { baseServerURL } from "../config/AppConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On Mount TRY to get profile (If there is a Session and Refresh token this would be successful)
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(baseServerURL + '/auth/profile', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    if (response.status !== 401) {
                        console.warn("Unexpected response fetching profile:", response.status);
                    }
                    setUser(null);
                } else {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (err) {
                setUser(null);
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    // Login give the Server a Username and Password and setup cookies
    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await fetch(baseServerURL + "/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }
            const userData = await response.json();
            setUser(userData);

        } catch (error) {
            setUser(null);
            throw error;

        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await fetch(baseServerURL + '/auth/logout', {
                method: 'GET',
                credentials: 'include',
            });
        } finally {
            setUser(null);
            setLoading(false);
        }
    };

    const signup = async (user) => {
        setLoading(true);
        try {
            const response = await fetch(baseServerURL + "/sign-up", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: user.firstName,
                    last_name: user.lastName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    confirm_password: user.confirmPassword
                }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }
            const userData = await response.json();
            setUser(userData);

        } catch (error) {
            setUser(null);
            throw error;

        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
