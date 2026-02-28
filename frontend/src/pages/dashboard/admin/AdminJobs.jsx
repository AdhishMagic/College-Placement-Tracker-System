import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const AdminJobs = () => {
    usePageMeta('Jobs Management', ['Admin', 'Jobs']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Jobs Management</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Jobs management content will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminJobs;
