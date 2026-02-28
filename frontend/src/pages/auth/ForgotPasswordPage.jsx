import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';

const ForgotPasswordPage = () => {
    return (
        <div>
            <h2 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-neutral-900)' }}>
                Forgot Password
            </h2>
            <p style={{ marginBottom: 'var(--space-8)', color: 'var(--color-neutral-500)' }}>
                Enter your email and we&apos;ll send you a reset link
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <Input label="Email Address" type="email" placeholder="you@example.com" required />
                <Button type="submit" variant="primary" size="lg" fullWidth>
                    Send Reset Link
                </Button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                Remember your password?{' '}
                <Link to="/login" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default ForgotPasswordPage;
