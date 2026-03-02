import React, { useState, useEffect } from 'react';
import KPICard from '../../../components/analytics/KPICard/KPICard';
import ChartContainer from '../../../components/analytics/ChartContainer/ChartContainer';
import CompanyPerformanceTable from '../../../components/analytics/CompanyPerformanceTable/CompanyPerformanceTable';
import AnalyticsControls from '../../../components/analytics/AnalyticsControls/AnalyticsControls';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        department: 'all',
        year: '2026',
        company: 'all'
    });

    useEffect(() => {
        // Simulate API fetch delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setLoading(true);
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleExport = (format) => {
        console.log(`Exporting report as ${format}`);
        // Trigger export action logic here
    };

    if (loading) {
        return (
            <div className="analytics-page">
                <header className="page-header">
                    <div>
                        <h1>Placement Reports & Analytics</h1>
                        <p>Executive overview of placement performance</p>
                    </div>
                </header>

                <AnalyticsControls onFilterChange={handleFilterChange} onExport={handleExport} />

                {/* Loading Skeletons for KPIs */}
                <div className="kpi-grid">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="kpi-skeleton"></div>
                    ))}
                </div>

                {/* Loading Skeletons for Charts */}
                <div className="chart-grid">
                    <div className="chart-skeleton"></div>
                    <div className="chart-skeleton"></div>
                </div>
                <div className="chart-grid third-grid">
                    <div className="chart-skeleton pie"></div>
                    <div className="chart-skeleton bar"></div>
                </div>

                {/* Loading Table */}
                <CompanyPerformanceTable loading={true} />
            </div>
        );
    }

    return (
        <div className="analytics-page">
            <header className="page-header">
                <div>
                    <h1>Placement Reports & Analytics</h1>
                    <p>Executive overview of placement performance</p>
                </div>
            </header>

            <AnalyticsControls onFilterChange={handleFilterChange} onExport={handleExport} />

            <section className="kpi-grid">
                <KPICard
                    title="Placement %"
                    value="87.5%"
                    trend="up"
                    growth="2.3"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
                />
                <KPICard
                    title="Highest Package"
                    value="₹45 LPA"
                    trend="up"
                    growth="15.0"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                />
                <KPICard
                    title="Average Package"
                    value="₹12.5 LPA"
                    trend="up"
                    growth="8.4"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                />
                <KPICard
                    title="Total Offers"
                    value="1,245"
                    trend="up"
                    growth="12.1"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>}
                />
                <KPICard
                    title="Companies"
                    value="156"
                    trend="down"
                    growth="4.2"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>}
                />
            </section>

            <section className="chart-grid">
                <ChartContainer
                    title="Students Placed per Department"
                    info="Total placements sorted by highest number."
                    legend={
                        <div className="chart-legend-simple">
                            <span className="legend-item"><span className="dot blue"></span>Placed</span>
                            <span className="legend-item"><span className="dot gray"></span>Total</span>
                        </div>
                    }
                >
                    {/* <BarChart data={departmentData} /> placeholder */}
                </ChartContainer>

                <ChartContainer
                    title="Applications Trend Over Time"
                    info="Monthly application submissions timeline."
                >
                    {/* <LineChart data={trendData} /> placeholder */}
                </ChartContainer>
            </section>

            <section className="chart-grid third-grid">
                <ChartContainer
                    title="Offer Distribution by Company"
                    info="Top 5 recruiters by offer count."
                >
                    {/* <PieChart data={companyDistributionData} /> placeholder */}
                </ChartContainer>

                <ChartContainer
                    title="Package Distribution Ranges"
                    info="Breakdown of salary ranges offered."
                >
                    {/* <BarChart data={packageRangeData} /> placeholder */}
                </ChartContainer>
            </section>

            <section className="table-section">
                <CompanyPerformanceTable loading={false} />
            </section>
        </div>
    );
};

export default AnalyticsDashboard;
