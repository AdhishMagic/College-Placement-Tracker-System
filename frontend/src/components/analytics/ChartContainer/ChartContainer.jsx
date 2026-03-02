import React from 'react';
import './ChartContainer.css';

const ChartContainer = ({ title, children, legend, info }) => {
    return (
        <div className="analytics-chart-container">
            <div className="chart-header">
                <h3 className="chart-title">
                    {title}
                    {info && (
                        <div className="chart-info-icon" title={info}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        </div>
                    )}
                </h3>
                {legend && (
                    <div className="chart-controls">
                        {/* Filter or Legend Controls passed as props */}
                        {legend}
                    </div>
                )}
            </div>
            <div className="chart-body">
                {/* Placeholder for actual chart component (e.g. Recharts) */}
                <div className="chart-placeholder">
                    {children ? children : (
                        <div className="chart-empty-state">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            <p>Chart Data Unavailable</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChartContainer;
