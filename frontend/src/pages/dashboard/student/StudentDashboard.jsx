import React from 'react';
import { usePageMeta } from '../../../hooks';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Card from '../../../components/ui/Card/Card';
import Badge from '../../../components/ui/Badge/Badge';
import Button from '../../../components/ui/Button/Button';
import {
    FiBriefcase,
    FiFileText,
    FiCheckCircle,
    FiClock,
    FiAward,
    FiUser,
    FiSearch,
    FiEdit3,
    FiCalendar
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
    // Custom hook to update page title and breadcrumbs
    usePageMeta('Student Dashboard', ['Student', 'Dashboard']);

    // Mock User Data (will be replaced by Redux state)
    const user = {
        name: 'Alex Johnson',
        role: 'Student',
        branch: 'Computer Science',
        batch: '2026',
        isEligible: true,
        profileCompletion: 85
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
            {/* 1. Welcome Header Section & 3. Eligibility Status Overview */}
            <motion.div className={styles.welcomeSection} variants={itemVariants}>
                <div className={styles.welcomeContent}>
                    <h1>Welcome back, {user.name}! 👋</h1>
                    <p>Here is what's happening with your placements today.</p>
                </div>

                <div className={`${styles.eligibilityBadge} ${user.isEligible ? styles.eligible : styles.pending}`}>
                    <div>
                        <h4>Eligibility Status</h4>
                        <p>{user.isEligible ? 'Eligible for Placements' : 'Pending Documents'}</p>
                    </div>
                    {user.isEligible ? (
                        <Badge variant="success" size="lg">Active</Badge>
                    ) : (
                        <Badge variant="warning" size="lg">Action Required</Badge>
                    )}
                </div>
            </motion.div>

            {/* 2. Placement Progress Summary */}
            <motion.div className={styles.gridSection} variants={itemVariants}>
                <StatCard
                    icon={<FiFileText />}
                    label="Applications Submitted"
                    value="12"
                    trend="+3"
                    trendType="up"
                    color="primary"
                />
                <StatCard
                    icon={<FiCheckCircle />}
                    label="Eligible Jobs"
                    value="45"
                    color="info"
                />
                <StatCard
                    icon={<FiCalendar />}
                    label="Interviews Scheduled"
                    value="2"
                    color="warning"
                />
                <StatCard
                    icon={<FiAward />}
                    label="Offers Received"
                    value="1"
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
                    {/* 4. My Applications Snapshot */}
                    <Card padding="md">
                        <Card.Header>
                            <div className={styles.sectionHeader}>
                                <h3>Recent Applications</h3>
                                <a href="/student/applications" className={styles.viewAll}>View All</a>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.appList}>
                                {[
                                    { company: 'Google', role: 'Software Engineer', status: 'Interview', date: '2 days ago', badge: 'warning' },
                                    { company: 'Microsoft', role: 'Frontend Developer', status: 'Applied', date: '1 week ago', badge: 'info' },
                                    { company: 'Amazon', role: 'SDE 1', status: 'Shortlisted', date: '2 weeks ago', badge: 'success' },
                                ].map((app, index) => (
                                    <div key={index} className={styles.appItem}>
                                        <div className={styles.appInfo}>
                                            <h4>{app.company}</h4>
                                            <p>{app.role} • Applied {app.date}</p>
                                        </div>
                                        <Badge variant={app.badge}>{app.status}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* 7. Recommended Jobs Section */}
                    <Card padding="md">
                        <Card.Header>
                            <div className={styles.sectionHeader}>
                                <h3>Recommended Match</h3>
                                <a href="/student/jobs" className={styles.viewAll}>Browse Jobs</a>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.appList}>
                                {[
                                    { company: 'Atlassian', role: 'UI Engineer', match: '95% Match', type: 'Full-time' },
                                    { company: 'Netflix', role: 'Backend Engineer', match: '88% Match', type: 'Internship' },
                                ].map((job, index) => (
                                    <div key={index} className={styles.appItem} style={{ borderLeft: '4px solid var(--color-primary-500)' }}>
                                        <div className={styles.appInfo}>
                                            <h4>{job.company}</h4>
                                            <p>{job.role} • {job.type}</p>
                                        </div>
                                        <Badge variant="success" size="sm" icon={<FiCheckCircle />}>{job.match}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* 6. Offer Status Section */}
                    <Card padding="md">
                        <Card.Header>
                            <h3>Offer Status</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.appItem} style={{ backgroundColor: 'var(--color-success-50)', borderColor: 'var(--color-success-200)' }}>
                                <div className={styles.appInfo}>
                                    <h4 style={{ color: 'var(--color-success-800)' }}>TechFlow Innovations</h4>
                                    <p style={{ color: 'var(--color-success-600)' }}>Software Developer Engineer</p>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                    <Badge variant="success">Offer Accepted</Badge>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </motion.div>

                {/* Right Column (1/3 width) */}
                <motion.div
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
                    variants={itemVariants}
                >
                    {/* 8. Profile Completion Indicator */}
                    <Card padding="md">
                        <Card.Header>
                            <h3>Profile Completion</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.progressText}>
                                <span>Completeness</span>
                                <span style={{ fontWeight: 600, color: 'var(--color-primary-600)' }}>{user.profileCompletion}%</span>
                            </div>
                            <div className={styles.profileProgress}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${user.profileCompletion}%` }}
                                />
                            </div>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-500)' }}>
                                Complete your profile to 100% to increase shortlisting chances.
                            </p>
                        </Card.Body>
                    </Card>

                    {/* 9. Quick Actions */}
                    <Card padding="md">
                        <Card.Header>
                            <h3>Quick Actions</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.quickActions}>
                                <button className={styles.actionBtn}>
                                    <FiEdit3 />
                                    <span>Update Resume</span>
                                </button>
                                <button className={styles.actionBtn}>
                                    <FiUser />
                                    <span>Complete Profile</span>
                                </button>
                                <button className={styles.actionBtn}>
                                    <FiSearch />
                                    <span>Browse Jobs</span>
                                </button>
                                <button className={styles.actionBtn}>
                                    <FiClock />
                                    <span>My History</span>
                                </button>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* 5. Upcoming Interviews Panel Showcase */}
                    <Card padding="md">
                        <Card.Header>
                            <h3>Upcoming Interviews</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.timeline}>
                                <div className={styles.timelineItem}>
                                    <div className={styles.timelineHeader}>
                                        <span className={styles.timelineTitle}>Technical Round 1</span>
                                        <span className={styles.timelineTime}>Tomorrow, 10:00 AM</span>
                                    </div>
                                    <div className={styles.timelineCompany}>Google • React / Node.js</div>
                                </div>
                                <div className={styles.timelineItem}>
                                    <div className={styles.timelineHeader}>
                                        <span className={styles.timelineTitle}>HR Interview</span>
                                        <span className={styles.timelineTime}>Oct 24, 2:00 PM</span>
                                    </div>
                                    <div className={styles.timelineCompany}>Atlassian • Culture Fit</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default StudentDashboard;
