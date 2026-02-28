import { usePageMeta } from '../../../hooks';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Card from '../../../components/ui/Card/Card';
import { FiBriefcase, FiUsers, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

const RecruiterDashboard = () => {
    usePageMeta('Recruiter Dashboard', ['Recruiter', 'Dashboard']);

    return (
        <div>
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-6)', marginBottom: 'var(--space-8)',
            }}>
                <StatCard icon={<FiBriefcase />} label="Active Listings" value="6" color="primary" />
                <StatCard icon={<FiUsers />} label="Total Applicants" value="142" trend="+24" trendType="up" color="info" />
                <StatCard icon={<FiCheckCircle />} label="Hired" value="18" color="success" />
                <StatCard icon={<FiTrendingUp />} label="Acceptance Rate" value="72%" color="warning" />
            </div>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: 'var(--space-6)',
            }}>
                <Card padding="md">
                    <Card.Header><h4>Recent Applicants</h4></Card.Header>
                    <Card.Body>
                        <p style={{ color: 'var(--color-neutral-500)' }}>Recent applicants will appear here.</p>
                    </Card.Body>
                </Card>
                <Card padding="md">
                    <Card.Header><h4>Job Performance</h4></Card.Header>
                    <Card.Body>
                        <p style={{ color: 'var(--color-neutral-500)' }}>Job listing performance metrics will appear here.</p>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default RecruiterDashboard;
