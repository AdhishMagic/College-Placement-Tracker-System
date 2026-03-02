import React from 'react';
import './AnalyticsControls.css';

const AnalyticsControls = ({ onFilterChange, onExport }) => {
    return (
        <div className="analytics-controls-container">
            <div className="analytics-filters">
                <div className="filter-group">
                    <label>Department</label>
                    <select onChange={(e) => onFilterChange('department', e.target.value)} defaultValue="all">
                        <option value="all">All Departments</option>
                        <option value="cse">Computer Science</option>
                        <option value="it">Information Technology</option>
                        <option value="ece">Electronics</option>
                        <option value="mech">Mechanical</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Year</label>
                    <select onChange={(e) => onFilterChange('year', e.target.value)} defaultValue="2026">
                        <option value="all">All Years</option>
                        <option value="2026">2026 (Current)</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Company</label>
                    <select onChange={(e) => onFilterChange('company', e.target.value)} defaultValue="all">
                        <option value="all">All Companies</option>
                        <option value="tier1">Tier 1 Only</option>
                        <option value="tier2">Tier 2 Only</option>
                        <option value="mass">Mass Recruiters</option>
                    </select>
                </div>

                <div className="filter-group date-range-group">
                    <label>Date Range</label>
                    <input type="date" className="date-input" placeholder="Start Date" />
                    <span className="date-separator">to</span>
                    <input type="date" className="date-input" placeholder="End Date" />
                </div>
            </div>

            <div className="analytics-exports">
                <button className="export-btn btn-secondary" onClick={() => onExport('csv')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Export CSV
                </button>
                <button className="export-btn btn-primary" onClick={() => onExport('pdf')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1.5-4.5L10.4 12.6z"></path></svg>
                    Export PDF
                </button>
            </div>
        </div>
    );
};

export default AnalyticsControls;
