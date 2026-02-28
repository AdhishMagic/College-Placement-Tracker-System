import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const StudentProfile = () => {
    usePageMeta('My Profile', ['Student', 'Profile']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>My Profile</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Student profile management will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StudentProfile;
