import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const AdminPlacements = () => {
    usePageMeta('Placement Records', ['Admin', 'Placements']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Placement Records</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Placement records content will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminPlacements;
