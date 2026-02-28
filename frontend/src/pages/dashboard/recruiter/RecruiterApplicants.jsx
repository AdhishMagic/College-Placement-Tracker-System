import { usePageMeta } from '../../../hooks';
import Card from '../../../components/ui/Card/Card';

const RecruiterApplicants = () => {
    usePageMeta('Applicant Management', ['Recruiter', 'Applicants']);

    return (
        <div>
            <Card padding="md">
                <Card.Header><h3>Applicant Management</h3></Card.Header>
                <Card.Body>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Applicant tracking and management will be implemented here.</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RecruiterApplicants;
