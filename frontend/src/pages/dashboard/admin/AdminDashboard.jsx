import React from 'react';
import { usePageMeta } from '../../../hooks';
import StatCard from '../../../components/ui/StatCard/StatCard';
import Card from '../../../components/ui/Card/Card';
import {
    FiUsers, FiBriefcase, FiTrendingUp, FiAward,
    FiFileText, FiTarget, FiPlus, FiUploadCloud,
    FiCheckCircle, FiClock, FiServer, FiShield
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
    usePageMeta('Admin Dashboard', ['Admin', 'Home']);

    return (
        <div className="admin-dashboard animate-fade-in-up">
            {/* 1. TOP SUMMARY METRICS */}
            <section>
                <h3 className="admin-dashboard__section-title">Overview</h3>
                <div className="admin-dashboard__metrics-grid">
                    <StatCard icon={<FiUsers />} label="Total Students" value="5,234" trend="+12%" trendType="up" color="primary" />
                    <StatCard icon={<FiBriefcase />} label="Total Companies" value="142" trend="+8" trendType="up" color="info" />
                    <StatCard icon={<FiFileText />} label="Total Applications" value="12,840" trend="+24%" trendType="up" color="warning" />
                    <StatCard icon={<FiTarget />} label="Placement Rate" value="79.5%" trend="+2.5%" trendType="up" color="success" />
                    <StatCard icon={<FiTrendingUp />} label="Highest Package" value="₹42.5L" trend="New" trendType="up" color="success" />
                    <StatCard icon={<FiAward />} label="Active Job Posts" value="48" trend="-3" trendType="down" color="danger" />
                </div>
            </section>

            {/* 2. PLACEMENT ANALYTICS SECTION */}
            <section>
                <h3 className="admin-dashboard__section-title">Placement Analytics</h3>
                <div className="admin-dashboard__charts-grid">
                    {/* Bar Chart Placeholder */}
                    <Card padding="md">
                        <Card.Header><h4>Students Placed per Company</h4></Card.Header>
                        <Card.Body>
                            <div className="chart-placeholder">
                                [ Bar Chart Integration Placeholder ]
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Pie Chart Placeholder */}
                    <Card padding="md">
                        <Card.Header><h4>Offer Distribution (Dept)</h4></Card.Header>
                        <Card.Body>
                            <div className="chart-placeholder">
                                [ Pie Chart Integration Placeholder ]
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Line Chart Placeholder */}
                    <Card padding="md">
                        <Card.Header><h4>Applications Trend Over Time</h4></Card.Header>
                        <Card.Body>
                            <div className="chart-placeholder">
                                [ Line Chart Integration Placeholder ]
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </section>

            {/* 3. OPERATIONS SCENE (Activity, Health, Actions) */}
            <section>
                <h3 className="admin-dashboard__section-title">System Operations</h3>
                <div className="admin-dashboard__ops-grid">

                    {/* Recent Activity Panel */}
                    <Card padding="md">
                        <Card.Header><h4>Recent Activity</h4></Card.Header>
                        <Card.Body>
                            <div className="activity-list">
                                <div className="activity-item">
                                    <div className="activity-avatar"><FiFileText /></div>
                                    <div className="activity-content">
                                        <p><strong>Rahul Sharma</strong> submitted application for Google SDE.</p>
                                        <div className="activity-time">2 mins ago</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-avatar" style={{ backgroundColor: 'var(--color-success-100)', color: 'var(--color-success-600)' }}><FiCheckCircle /></div>
                                    <div className="activity-content">
                                        <p><strong>Amazon</strong> company profile approved.</p>
                                        <div className="activity-time">15 mins ago</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-avatar" style={{ backgroundColor: 'var(--color-warning-100)', color: 'var(--color-warning-600)' }}><FiAward /></div>
                                    <div className="activity-content">
                                        <p>New Offer generated for <strong>Priya Singh</strong> by Microsoft.</p>
                                        <div className="activity-time">1 hour ago</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-avatar"><FiClock /></div>
                                    <div className="activity-content">
                                        <p>Placement Drive extended for <strong>TCS Ninja</strong>.</p>
                                        <div className="activity-time">3 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* System Health Overview */}
                    <Card padding="md">
                        <Card.Header><h4>System Health Overview</h4></Card.Header>
                        <Card.Body>
                            <div className="health-metrics">
                                <div className="health-item">
                                    <div className="health-item-header">
                                        <span><FiUsers style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Active Users Today</span>
                                        <span className="health-item-value">1,204 / 5,234</span>
                                    </div>
                                    <div className="health-bar-bg">
                                        <div className="health-bar-fill health-bar-fill--info" style={{ width: '23%' }}></div>
                                    </div>
                                </div>

                                <div className="health-item">
                                    <div className="health-item-header">
                                        <span><FiShield style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Pending Approvals</span>
                                        <span className="health-item-value">12</span>
                                    </div>
                                    <div className="health-bar-bg">
                                        <div className="health-bar-fill health-bar-fill--warning" style={{ width: '12%' }}></div>
                                    </div>
                                </div>

                                <div className="health-item">
                                    <div className="health-item-header">
                                        <span><FiServer style={{ marginRight: '8px', verticalAlign: 'middle' }} /> System Logs (Errors)</span>
                                        <span className="health-item-value">0 Errors</span>
                                    </div>
                                    <div className="health-bar-bg">
                                        <div className="health-bar-fill health-bar-fill--success" style={{ width: '100%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Quick Actions */}
                    <Card padding="md">
                        <Card.Header><h4>Quick Actions</h4></Card.Header>
                        <Card.Body>
                            <div className="quick-actions">
                                <button className="action-button">
                                    <FiPlus className="action-icon" />
                                    <span>Add New Company</span>
                                </button>
                                <button className="action-button">
                                    <FiUploadCloud className="action-icon" />
                                    <span>Upload Students CSV</span>
                                </button>
                                <button className="action-button">
                                    <FiFileText className="action-icon" />
                                    <span>Generate Placement Report</span>
                                </button>
                            </div>
                        </Card.Body>
                    </Card>

                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
