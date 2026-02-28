import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const RecruiterMyJobs = () => {
    usePageMeta('My Job Listings', ['Recruiter', 'My Jobs']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>My Job Listings</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Your posted job listings will appear here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RecruiterMyJobs;
