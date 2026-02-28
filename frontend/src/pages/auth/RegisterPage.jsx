import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthInput from '../../features/auth/components/AuthInput';
import Button from '../../components/ui/Button/Button';
import './AuthPages.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
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
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms to continue';
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

        // Simulation of API request
        setTimeout(() => {
            setLoading(false);
            // Assuming successful registration
            navigate('/login', { replace: true });
        }, 1500);
    };

    return (
        <div className="auth-page">
            <div className="auth-page__header">
                <h2 className="auth-page__title">Create Account</h2>
                <p className="auth-page__subtitle">Join PlaceTrack as a {!role ? 'Student' : role.charAt(0).toUpperCase() + role.slice(1)}</p>
            </div>

            {statusError && (
                <div className="auth-page__status auth-page__status--error" role="alert">
                    <span>⚠️</span>
                    {statusError}
                </div>
            )}

            <div className="auth-page__role-selector" aria-label="Select Role">
                <div
                    className={`auth-page__role-option ${role === 'student' ? 'auth-page__role-option--active' : ''}`}
                    onClick={() => setRole('student')}
                >
                    <span className="auth-page__role-icon">🧑‍🎓</span>
                    <span className="auth-page__role-label">Student</span>
                </div>
                <div
                    className={`auth-page__role-option ${role === 'recruiter' ? 'auth-page__role-option--active' : ''}`}
                    onClick={() => setRole('recruiter')}
                >
                    <span className="auth-page__role-icon">👔</span>
                    <span className="auth-page__role-label">Recruiter</span>
                </div>
            </div>

            <form className="auth-page__form" onSubmit={handleSubmit} noValidate>
                <AuthInput
                    label="Full Name"
                    name="fullName"
                    placeholder={`e.g. ${role === 'student' ? 'John Doe' : 'Jane Smith'}`}
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                />

                <AuthInput
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder={`e.g. ${role === 'student' ? 'john.doe@university.edu' : 'jane.smith@company.com'}`}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <AuthInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />

                <div className="auth-page__options" style={{ marginTop: '0.5rem' }}>
                    <label className="auth-page__checkbox-group">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="auth-page__checkbox"
                        />
                        <span className="auth-page__checkbox-label">
                            I agree to the <a href="#" className="auth-page__link">Terms of Service</a> & <a href="#" className="auth-page__link">Privacy Policy</a>
                        </span>
                    </label>
                </div>
                {errors.termsAccepted && (
                    <p style={{ color: 'var(--color-danger-500)', fontSize: 'var(--text-xs)', marginTop: '-1rem', marginBottom: '1rem' }}>
                        {errors.termsAccepted}
                    </p>
                )}

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Create Account
                </Button>
            </form>

            <div className="auth-page__footer">
                Already have an account?{' '}
                <Link to="/login" className="auth-page__link">
                    Sign in here
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
