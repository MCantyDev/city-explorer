import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Ensure the Auth hook has finished before continuing
    if (loading) { return null; }

    if (!user || !user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminProtectedRoute;