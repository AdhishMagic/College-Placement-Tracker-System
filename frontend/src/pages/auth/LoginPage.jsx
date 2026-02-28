import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthInput from '../../features/auth/components/AuthInput';
import Button from '../../components/ui/Button/Button';
import './AuthPages.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [statusError, setStatusError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setStatusError(null);

        // Simulation of API request processing
        setTimeout(() => {
            setLoading(false);
            // Simulate success/failure
            if (formData.email === 'admin@placetrack.com' && formData.password === 'admin123') {
                navigate('/dashboard', { replace: true });
            } else {
                setStatusError('Invalid credentials. Please try again.');
            }
        }, 1500);
    };

    return (
        <div className="auth-page">
            <div className="auth-page__header">
                <h2 className="auth-page__title">Welcome Back</h2>
                <p className="auth-page__subtitle">Sign in to your PlaceTrack account</p>
            </div>

            {statusError && (
                <div className="auth-page__status auth-page__status--error" role="alert">
                    <span>⚠️</span>
                    {statusError}
                </div>
            )}

            <form className="auth-page__form" onSubmit={handleSubmit} noValidate>
                <AuthInput
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <div className="auth-page__options">
                    <label className="auth-page__checkbox-group">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="auth-page__checkbox"
                        />
                        <span className="auth-page__checkbox-label">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="auth-page__link">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Sign In
                </Button>
            </form>

            <div className="auth-page__divider">Or sign in with</div>

            <Button type="button" variant="outline" size="md" fullWidth>
                Continue with Google
            </Button>

            <div className="auth-page__footer">
                Don't have an account?{' '}
                <Link to="/register" className="auth-page__link">
                    Create an account
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
