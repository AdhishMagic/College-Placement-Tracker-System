import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const RecruiterProfile = () => {
    usePageMeta('Company Profile', ['Recruiter', 'Profile']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Company Profile</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Company profile management will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RecruiterProfile;
