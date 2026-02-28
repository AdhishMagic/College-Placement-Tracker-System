import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const AdminStudents = () => {
    usePageMeta('Students Management', ['Admin', 'Students']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Students Management</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Students management content will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminStudents;
