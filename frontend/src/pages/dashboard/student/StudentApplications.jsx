import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const StudentApplications = () => {
    usePageMeta('My Applications', ['Student', 'Applications']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>My Applications</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Application tracking will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StudentApplications;
