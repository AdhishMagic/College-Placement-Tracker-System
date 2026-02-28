import { usePageMeta } from '../../../hooks';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Card from '../../../components/ui/Card/Card';
import { FiUsers, FiBriefcase, FiTrendingUp, FiAward } from 'react-icons/fi';

const AdminDashboard = () => {
    usePageMeta('Admin Dashboard', ['Admin', 'Dashboard']);

    return (
        <div>
            {/* KPI Cards */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--space-6)', marginBottom: 'var(--space-8)',
            }}>
                <StatCard icon={<FiUsers />} label="Total Students" value="5,234" trend="+12%" trendType="up" color="primary" />
                <StatCard icon={<FiBriefcase />} label="Active Jobs" value="48" trend="+5" trendType="up" color="info" />
                <StatCard icon={<FiAward />} label="Placed Students" value="4,128" trend="79%" trendType="up" color="success" />
                <StatCard icon={<FiTrendingUp />} label="Avg. Package" value="₹12.4L" trend="+8%" trendType="up" color="warning" />
            </div>

            {/* Charts Placeholder */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: 'var(--space-6)',
            }}>
                <Card padding="md">
                    <Card.Header><h4>Placement Trends</h4></Card.Header>
                    <Card.Body>
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-400)' }}>
                            Chart.js integration ready
                        </div>
                    </Card.Body>
                </Card>
                <Card padding="md">
                    <Card.Header><h4>Department-wise Stats</h4></Card.Header>
                    <Card.Body>
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-400)' }}>
                            Chart.js integration ready
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
