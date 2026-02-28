import React from 'react';
import { usePageMeta } from '../../../hooks';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Card from '../../../components/ui/Card/Card';
import Badge from '../../../components/ui/Badge/Badge';
import {
    FiBriefcase,
    FiUsers,
    FiCheckCircle,
    FiTrendingUp,
    FiSearch,
    FiPlusSquare,
    FiCalendar,
    FiEye,
    FiAward,
    FiMessageSquare,
    FiFilter
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './RecruiterDashboard.module.css';

const RecruiterDashboard = () => {
    usePageMeta('Recruiter Dashboard', ['Recruiter', 'Dashboard']);

    // Mock Recruiter / Company Data (will be replaced by Redux state)
    const company = {
        name: 'TechFlow Innovations',
        recruiterName: 'Sarah Jenkins',
        industry: 'Software & Technology',
        tier: 'Tier 1'
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className={styles.dashboardWrapper}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. Company Overview Header */}
            <motion.div className={styles.welcomeSection} variants={itemVariants}>
                <div className={styles.welcomeContent}>
                    <h1>Welcome back, {company.recruiterName} 👋</h1>
                    <p>Here is the hiring overview for {company.name}.</p>
                </div>
                <div className={styles.companyBadge}>
                    <div className={styles.companyLogo}>
                        TF
                    </div>
                    <div className={styles.companyInfo}>
                        <h4>{company.name}</h4>
                        <p>{company.industry} • {company.tier}</p>
                    </div>
                </div>
            </motion.div>

            {/* 2 & 3. Active Job Posts Summary & Total Applicants Analytics */}
            <motion.div className={styles.gridSection} variants={itemVariants}>
                <StatCard
                    icon={<FiBriefcase />}
                    label="Active Job Posts"
                    value="6"
                    color="primary"
                    trend="+1 this week"
                    trendType="up"
                />
                <StatCard
                    icon={<FiUsers />}
                    label="Total Applicants"
                    value="1,242"
                    trend="+15%"
                    trendType="up"
                    color="info"
                />
                <StatCard
                    icon={<FiCalendar />}
                    label="Interviews Scheduled"
                    value="48"
                    color="warning"
                />
                <StatCard
                    icon={<FiAward />}
                    label="Offers Released"
                    value="18"
                    trend="2 accepted"
                    trendType="up"
                    color="success"
                />
            </motion.div>

            {/* Main Content Layout */}
            <div className={styles.mainGrid}>
                {/* Left Column (2/3 width) */}
                <motion.div
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
                    variants={itemVariants}
                >
                    {/* 5. Interview Pipeline Overview */}
                    <Card padding="md">
                        <Card.Header>
                            <div className={styles.sectionHeader}>
                                <h3>Hiring Pipeline Overview</h3>
                                <a href="/recruiter/pipeline" className={styles.viewAll}>Detailed View</a>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.pipelineDisplay}>
                                <div className={styles.pipelineStage}>
                                    <h4>Applied</h4>
                                    <p>1,242</p>
                                </div>
                                <div className={styles.pipelineStage}>
                                    <h4>Shortlisted</h4>
                                    <p>350</p>
                                </div>
                                <div className={styles.pipelineStage}>
                                    <h4>Round 1</h4>
                                    <p>180</p>
                                </div>
                                <div className={styles.pipelineStage}>
                                    <h4>Round 2</h4>
                                    <p>65</p>
                                </div>
                                <div className={styles.pipelineStage}>
                                    <h4>Offered</h4>
                                    <p>18</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* 7. Recent Applications Feed */}
                    <Card padding="md">
                        <Card.Header>
                            <div className={styles.sectionHeader}>
                                <h3>Recent Applications</h3>
                                <a href="/recruiter/applicants" className={styles.viewAll}>View All Candidates</a>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.appList}>
                                {[
                                    { name: 'Arjun Mehta', cgpa: '9.2', role: 'Frontend Developer', status: 'Applied', badge: 'info', time: '2h ago' },
                                    { name: 'Priya Sharma', cgpa: '8.8', role: 'Backend Engineer', status: 'Shortlisted', badge: 'success', time: '4h ago' },
                                    { name: 'Rohit Singh', cgpa: '8.5', role: 'Product Design', status: 'Round 1', badge: 'warning', time: '5h ago' },
                                    { name: 'Neha Gupta', cgpa: '9.4', role: 'Frontend Developer', status: 'Applied', badge: 'info', time: '1d ago' },
                                ].map((app, index) => (
                                    <div key={index} className={styles.appItem}>
                                        <div className={styles.appInfo}>
                                            <h4>{app.name}</h4>
                                            <p>{app.role} • CGPA: {app.cgpa} • {app.time}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                            <Badge variant={app.badge}>{app.status}</Badge>
                                            <div className={styles.candidateActions}>
                                                <button className={styles.iconBtn} title="View Profile"><FiEye /></button>
                                                <button className={styles.iconBtn} title="Message"><FiMessageSquare /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Job Performance Overview */}
                    <Card padding="md">
                        <Card.Header>
                            <div className={styles.sectionHeader}>
                                <h3>Active Job Performance</h3>
                                <a href="/recruiter/jobs" className={styles.viewAll}>Manage Jobs</a>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.jobPerformanceList}>
                                {[
                                    { title: 'Frontend Developer', views: '1.2k', applicants: '450', daysLeft: '5 days' },
                                    { title: 'Backend Engineer', views: '850', applicants: '320', daysLeft: '12 days' },
                                    { title: 'Product Design Intern', views: '2.4k', applicants: '890', daysLeft: 'Urgent' },
                                ].map((job, index) => (
                                    <div key={index} className={styles.jobItem}>
                                        <div className={styles.jobHeader}>
                                            <h4>{job.title}</h4>
                                            <Badge variant={job.daysLeft === 'Urgent' ? 'danger' : 'neutral'}>{job.daysLeft}</Badge>
                                        </div>
                                        <div className={styles.jobStats}>
                                            <div className={styles.jobStat}>
                                                <FiEye />
                                                <span>{job.views} views</span>
                                            </div>
                                            <div className={styles.jobStat}>
                                                <FiUsers />
                                                <span>{job.applicants} applied</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </motion.div>

                {/* Right Column (1/3 width) */}
                <motion.div
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
                    variants={itemVariants}
                >
                    {/* 9. Quick Action Panel */}
                    <Card padding="md">
                        <Card.Header>
                            <h3>Quick Actions</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.quickActions}>
                                <button className={styles.actionBtn}>
                                    <FiPlusSquare />
                                    <span>Post Job</span>
                                </button>
                                <button className={styles.actionBtn}>
                                    <FiUsers />
                                    <span>Applicants</span>
                                </button>
                                <button className={styles.actionBtn}>
                                    <FiCalendar />
                                    <span>Schedule</span>
                                </button>
                                <button className={styles.actionBtn}>
                                    <FiFilter />
                                    <span>Filter</span>
                                </button>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* 4 & 8. Shortlisted Candidates & Filtering Preview */}
                    <Card padding="md">
                        <Card.Header>
                            <div className={styles.sectionHeader}>
                                <h3>Smart Filtering</h3>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)', marginBottom: 'var(--space-4)' }}>
                                Try our ATS filtering to find the best match instantly.
                            </p>
                            <div className={styles.jobItem} style={{ borderStyle: 'dashed', backgroundColor: 'var(--color-neutral-50)', textAlign: 'center', cursor: 'pointer' }}>
                                <FiFilter style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-primary-400)', marginBottom: 'var(--space-2)' }} />
                                <h4 style={{ color: 'var(--color-secondary-900)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-1)' }}>Run Candidate Filter</h4>
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-500)' }}>Filter by CGPA, Skills & Branch</p>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* 6. Offer Statistics */}
                    <Card padding="md">
                        <Card.Header>
                            <h3>Offer Acceptance Rate</h3>
                        </Card.Header>
                        <Card.Body>
                            <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    border: '8px solid var(--color-success-500)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto var(--space-4)',
                                    position: 'relative'
                                }}>
                                    <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--color-secondary-900)' }}>85%</span>
                                </div>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)' }}>
                                    High acceptance rate this season. Represents offers accepted vs. released.
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-neutral-200)', paddingTop: 'var(--space-3)' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-500)' }}>Released</span>
                                    <span style={{ fontWeight: '600', color: 'var(--color-secondary-900)' }}>18</span>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-500)' }}>Accepted</span>
                                    <span style={{ fontWeight: '600', color: 'var(--color-success-600)' }}>15</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                </motion.div>
            </div>
        </motion.div>
    );
};

export default RecruiterDashboard;
