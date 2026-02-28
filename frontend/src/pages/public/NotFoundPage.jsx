import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

const NotFoundPage = () => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', minHeight: '100vh', textAlign: 'center',
            padding: '2rem',
        }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--color-neutral-200)' }}>404</h1>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-neutral-900)' }}>Page Not Found</h2>
            <p style={{ color: 'var(--color-neutral-500)', marginBottom: '2rem', maxWidth: '400px' }}>
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link to="/">
                <Button variant="primary">Back to Home</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
