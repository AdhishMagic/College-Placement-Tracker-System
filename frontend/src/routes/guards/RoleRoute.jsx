import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserRole } from '../../features/auth/authSlice';

/**
 * RoleRoute
 * Restricts access to users with specific roles.
 *
 * @param {Object} props
 * @param {string[]} props.allowedRoles — Array of roles allowed to access
 * @param {React.ReactNode} props.children — Child components to render
 * @param {string} [props.redirectTo] — Where to redirect on denial (default: /dashboard)
 */
const RoleRoute = ({ allowedRoles = [], children, redirectTo = '/dashboard' }) => {
    const userRole = useSelector(selectUserRole);

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default RoleRoute;
