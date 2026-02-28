import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const StudentJobs = () => {
    usePageMeta('Browse Jobs', ['Student', 'Jobs']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Browse Jobs</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Job listings and search will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StudentJobs;
