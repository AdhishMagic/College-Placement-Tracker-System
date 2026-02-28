import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectAuthLoading, selectAuthError } from '../../features/auth/authSlice';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';

const LoginPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    return (
        <div>
            <h2 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-neutral-900)' }}>
                Welcome Back
            </h2>
            <p style={{ marginBottom: 'var(--space-8)', color: 'var(--color-neutral-500)' }}>
                Sign in to your placement tracker account
            </p>

            {error && (
                <div style={{
                    padding: 'var(--space-3) var(--space-4)',
                    backgroundColor: 'var(--color-danger-50)',
                    color: 'var(--color-danger-600)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    marginBottom: 'var(--space-4)',
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/forgot-password" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-600)' }}>
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Sign In
                </Button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                Don&apos;t have an account?{' '}
                <Link to="/register" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
                    Register
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
