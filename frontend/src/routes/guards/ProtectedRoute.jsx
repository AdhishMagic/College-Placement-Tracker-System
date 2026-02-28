import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthLoading } from '../../features/auth/authSlice';
import Spinner from '../../components/ui/Spinner/Spinner';

/**
 * ProtectedRoute
 * Wraps routes that require authentication.
 * Redirects unauthenticated users to /login.
 */
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);
    const location = useLocation();

    if (loading) {
        return <Spinner fullScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
