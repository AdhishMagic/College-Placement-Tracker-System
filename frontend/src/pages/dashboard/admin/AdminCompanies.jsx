import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const AdminCompanies = () => {
    usePageMeta('Companies Directory', ['Admin', 'Companies']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Companies Directory</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Companies directory content will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminCompanies;
