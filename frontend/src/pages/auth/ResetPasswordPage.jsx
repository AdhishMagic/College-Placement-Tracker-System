import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthInput from '../../features/auth/components/AuthInput';
import Button from '../../components/ui/Button/Button';
import './AuthPages.css';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.password) newErrors.password = 'New password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
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

        // Simulation of API request
        setTimeout(() => {
            setLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 3000);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="auth-page">
                <div className="auth-page__header">
                    <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>🔐</div>
                    <h2 className="auth-page__title">Password Reset</h2>
                    <p className="auth-page__subtitle" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                        Your password has been successfully reset. <br />
                        You will be redirected shortly...
                    </p>
                </div>

                <div className="auth-page__status auth-page__status--success" role="alert" style={{ alignSelf: 'center' }}>
                    <span>✅</span>
                    Ready to login with new credentials!
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-page__header">
                <h2 className="auth-page__title">Create New Password</h2>
                <p className="auth-page__subtitle">
                    Your new password must be different from previous used passwords.
                </p>
            </div>

            <form className="auth-page__form" onSubmit={handleSubmit} noValidate>
                <AuthInput
                    label="New Password"
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <AuthInput
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Reset Password
                </Button>
            </form>

            <div className="auth-page__footer">
                <Link to="/login" className="auth-page__link">
                    Remembered your password?
                </Link>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
