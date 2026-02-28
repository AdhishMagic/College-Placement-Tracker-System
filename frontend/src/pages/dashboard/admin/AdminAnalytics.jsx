import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const AdminAnalytics = () => {
    usePageMeta('Analytics Dashboard', ['Admin', 'Analytics']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Analytics Dashboard</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Analytics dashboard content will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminAnalytics;
