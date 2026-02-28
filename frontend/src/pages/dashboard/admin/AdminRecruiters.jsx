import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const AdminRecruiters = () => {
    usePageMeta('Recruiters Management', ['Admin', 'Recruiters']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Recruiters Management</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Recruiters management content will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminRecruiters;
