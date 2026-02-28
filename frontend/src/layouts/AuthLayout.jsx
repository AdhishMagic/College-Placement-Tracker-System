import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

/**
 * AuthLayout
 * Clean, centered layout for authentication pages.
 * Features the Edway-style split-screen design.
 */
const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="auth-layout__brand">
                <div className="auth-layout__brand-content">
                    <div className="auth-layout__logo">
                        <span className="auth-layout__logo-icon">🎓</span>
                        <h1 className="auth-layout__logo-text">PlaceTrack</h1>
                    </div>
                    <p className="auth-layout__tagline">
                        Empowering students, recruiters, and administrators with a modern
                        placement management platform.
                    </p>
                    <div className="auth-layout__stats">
                        <div className="auth-layout__stat">
                            <span className="auth-layout__stat-number">5,000+</span>
                            <span className="auth-layout__stat-label">Students</span>
                        </div>
                        <div className="auth-layout__stat">
                            <span className="auth-layout__stat-number">200+</span>
                            <span className="auth-layout__stat-label">Companies</span>
                        </div>
                        <div className="auth-layout__stat">
                            <span className="auth-layout__stat-number">95%</span>
                            <span className="auth-layout__stat-label">Placement Rate</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auth-layout__form">
                <div className="auth-layout__form-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
