import { usePageMeta } from '../../../hooks';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Card from '../../../components/ui/Card/Card';
import { FiBriefcase, FiFileText, FiCheckCircle, FiClock } from 'react-icons/fi';

const StudentDashboard = () => {
    usePageMeta('Student Dashboard', ['Student', 'Dashboard']);

    return (
        <div>
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-6)', marginBottom: 'var(--space-8)',
            }}>
                <StatCard icon={<FiBriefcase />} label="Available Jobs" value="48" color="primary" />
                <StatCard icon={<FiFileText />} label="Applications" value="12" color="info" />
                <StatCard icon={<FiCheckCircle />} label="Shortlisted" value="3" trend="+2" trendType="up" color="success" />
                <StatCard icon={<FiClock />} label="Pending" value="5" color="warning" />
            </div>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: 'var(--space-6)',
            }}>
                <Card padding="md">
                    <Card.Header><h4>Recent Applications</h4></Card.Header>
                    <Card.Body>
                        <p style={{ color: 'var(--color-neutral-500)' }}>Your recent applications will appear here.</p>
                    </Card.Body>
                </Card>
                <Card padding="md">
                    <Card.Header><h4>Upcoming Drives</h4></Card.Header>
                    <Card.Body>
                        <p style={{ color: 'var(--color-neutral-500)' }}>Upcoming placement drives will appear here.</p>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;
