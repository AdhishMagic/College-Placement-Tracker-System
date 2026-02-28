import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import './HomePage.css';

/**
 * HomePage — Public Landing Page
 * Edway-inspired hero section with placement stats.
 */
const HomePage = () => {
    return (
        <div className="home-page">
            {/* Navigation */}
            <nav className="home-nav">
                <div className="container home-nav__inner">
                    <div className="home-nav__logo">
                        <span className="home-nav__logo-icon">🎓</span>
                        <span className="home-nav__logo-text">PlaceTrack</span>
                    </div>
                    <div className="home-nav__actions">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="primary" size="sm">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="home-hero">
                <div className="container home-hero__inner">
                    <div className="home-hero__content">
                        <span className="home-hero__badge">🚀 Placement Season 2025–2026</span>
                        <h1 className="home-hero__title">
                            Your Career Journey <br />
                            <span className="home-hero__title-accent">Starts Here</span>
                        </h1>
                        <p className="home-hero__description">
                            Connect with top recruiters, track your applications, and get placed at your
                            dream company — all from one powerful platform.
                        </p>
                        <div className="home-hero__cta">
                            <Link to="/register">
                                <Button variant="primary" size="lg">Start Your Journey</Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" size="lg">Sign In</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="home-hero__stats-grid">
                        <div className="home-hero__stat-card">
                            <span className="home-hero__stat-value">5,000+</span>
                            <span className="home-hero__stat-label">Students Registered</span>
                        </div>
                        <div className="home-hero__stat-card">
                            <span className="home-hero__stat-value">200+</span>
                            <span className="home-hero__stat-label">Partner Companies</span>
                        </div>
                        <div className="home-hero__stat-card">
                            <span className="home-hero__stat-value">95%</span>
                            <span className="home-hero__stat-label">Placement Rate</span>
                        </div>
                        <div className="home-hero__stat-card">
                            <span className="home-hero__stat-value">₹12L</span>
                            <span className="home-hero__stat-label">Avg. Package</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
