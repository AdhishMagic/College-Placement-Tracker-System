import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/auth/authSlice';

/**
 * GuestRoute
 * Only accessible to non-authenticated users (login, register pages).
 * Redirects authenticated users to dashboard.
 */
const GuestRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default GuestRoute;
