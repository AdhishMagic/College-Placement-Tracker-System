import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthInput from '../../features/auth/components/AuthInput';
import Button from '../../components/ui/Button/Button';
import './AuthPages.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address');
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        setLoading(true);

        // Simulation of API request
        setTimeout(() => {
            setLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="auth-page">
                <div className="auth-page__header">
                    <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>✉️</div>
                    <h2 className="auth-page__title">Check your email</h2>
                    <p className="auth-page__subtitle" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                        We've sent password reset instructions to <br />
                        <strong>{email}</strong>
                    </p>
                </div>

                <div className="auth-page__status auth-page__status--success" role="alert" style={{ alignSelf: 'center' }}>
                    <span>✅</span>
                    Email sent successfully!
                </div>

                <div className="auth-page__divider"></div>

                <div className="auth-page__footer" style={{ marginTop: '0' }}>
                    Didn't receive the email?{' '}
                    <button
                        className="auth-page__link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                        onClick={() => setIsSuccess(false)}
                    >
                        Click to resend
                    </button>
                    <br /><br />
                    <Link to="/login" className="auth-page__link">
                        &larr; Back to sign in
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-page__header">
                <h2 className="auth-page__title">Reset Password</h2>
                <p className="auth-page__subtitle">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            <form className="auth-page__form" onSubmit={handleSubmit} noValidate>
                <AuthInput
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                    }}
                    error={error}
                />

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Send Reset Link
                </Button>
            </form>

            <div className="auth-page__footer">
                Remember your password?{' '}
                <Link to="/login" className="auth-page__link">
                    Back to sign in
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
