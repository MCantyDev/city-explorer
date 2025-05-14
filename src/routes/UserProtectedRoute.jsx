import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserProtectedRoute = ({ children, requireLogin=false }) => {
    const { user, loading } = useAuth();

    // Ensure the Auth hook has finished before continuing
    if (loading) { return null; }

    // If the Route requires a Login but User is NOT logged in
    if (requireLogin && !user) {
        return <Navigate to="/" replace />;
    }

    // If the Route requires user to NOT be logged in but user IS logged in
    if (!requireLogin && user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default UserProtectedRoute;