import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const RecruiterPostJob = () => {
    usePageMeta('Post New Job', ['Recruiter', 'Post Job']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Post New Job</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Job posting form will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RecruiterPostJob;
