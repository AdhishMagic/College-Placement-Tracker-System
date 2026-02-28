import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectAuthLoading, selectAuthError } from '../../features/auth/authSlice';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(form));
    };

    return (
        <div>
            <h2 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-neutral-900)' }}>
                Create Account
            </h2>
            <p style={{ marginBottom: 'var(--space-8)', color: 'var(--color-neutral-500)' }}>
                Join the placement tracker platform
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
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                />
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
                    placeholder="Create a password"
                    required
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-neutral-700)' }}>
                        I am a
                    </label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        style={{
                            padding: 'var(--space-3) var(--space-4)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1.5px solid var(--color-neutral-200)',
                            backgroundColor: 'var(--color-neutral-50)',
                            fontSize: 'var(--text-base)',
                            color: 'var(--color-neutral-900)',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="student">Student</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Create Account
                </Button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
