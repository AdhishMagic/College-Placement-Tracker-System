import { Outlet, Link } from 'react-router-dom';
import './AuthLayout.css';

/**
 * AuthLayout
 * Centered card layout for authentication pages.
 * Features a clean, premium academic aesthetic with soft shadows.
 */
const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="auth-layout__container">
                <div className="auth-layout__header">
                    <Link to="/" className="auth-layout__logo">
                        <span className="auth-layout__logo-icon">🎓</span>
                        <span className="auth-layout__logo-text">PlaceTrack</span>
                    </Link>
                </div>
                <div className="auth-layout__card">
                    <Outlet />
                </div>
                <div className="auth-layout__footer">
                    <p>&copy; {new Date().getFullYear()} PlaceTrack Enterprise. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
