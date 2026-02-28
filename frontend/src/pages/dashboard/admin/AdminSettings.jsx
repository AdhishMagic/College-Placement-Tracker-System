import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const AdminSettings = () => {
    usePageMeta('System Settings', ['Admin', 'Settings']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>System Settings</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>System settings content will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminSettings;
