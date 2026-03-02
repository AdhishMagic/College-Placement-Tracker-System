import React from 'react';
import './KPICard.css';

const KPICard = ({ title, value, icon, growth, trend }) => {
    return (
        <div className="analytics-kpi-card">
            <div className="kpi-card-header">
                <div className="kpi-icon-container">{icon}</div>
                {growth && (
                    <div className={`kpi-growth ${trend === 'up' ? 'positive' : 'negative'}`}>
                        {trend === 'up' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline></svg>
                        )}
                        <span>{growth}%</span>
                    </div>
                )}
            </div>
            <div className="kpi-card-body">
                <h3 className="kpi-title">{title}</h3>
                <p className="kpi-value">{value}</p>
            </div>
        </div>
    );
};

export default KPICard;
