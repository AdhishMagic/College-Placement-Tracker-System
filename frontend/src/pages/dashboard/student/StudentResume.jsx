import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const StudentResume = () => {
    usePageMeta('My Resume', ['Student', 'Resume']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>My Resume</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Resume upload and management will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StudentResume;
