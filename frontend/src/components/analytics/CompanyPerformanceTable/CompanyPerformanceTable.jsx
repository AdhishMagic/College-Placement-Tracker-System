import React, { useState } from 'react';
import './CompanyPerformanceTable.css';

const CompanyPerformanceTable = ({ data, loading }) => {
    const [sortField, setSortField] = useState('offers');
    const [sortDirection, setSortDirection] = useState('desc');

    // Dummy fallback data
    const companies = data || [
        { id: 1, name: 'TechNova', jobs: 3, applicants: 450, offers: 25, ratio: '5.5%' },
        { id: 2, name: 'InnoTech Solutions', jobs: 2, applicants: 320, offers: 18, ratio: '5.6%' },
        { id: 3, name: 'Global Systems', jobs: 5, applicants: 600, offers: 40, ratio: '6.6%' },
        { id: 4, name: 'Creative Web', jobs: 1, applicants: 150, offers: 5, ratio: '3.3%' },
        { id: 5, name: 'NextGen Apps', jobs: 4, applicants: 510, offers: 32, ratio: '6.2%' },
    ];

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    if (loading) {
        return (
            <div className="analytics-table-container loading">
                <div className="table-skeleton">
                    <div className="skeleton-row header"></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="skeleton-row"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="analytics-table-container">
            <div className="table-header">
                <h3>Company Performance</h3>
                <div className="table-actions">
                    <div className="search-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search companies..." />
                    </div>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="analytics-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')} className="sortable">
                                Company Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('jobs')} className="sortable text-right">
                                Jobs Posted {sortField === 'jobs' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('applicants')} className="sortable text-right">
                                Applicants {sortField === 'applicants' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('offers')} className="sortable text-right">
                                Offers Made {sortField === 'offers' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('ratio')} className="sortable text-right">
                                Selection Ratio {sortField === 'ratio' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.length > 0 ? (
                            companies.map((company) => (
                                <tr key={company.id}>
                                    <td className="company-name-cell">
                                        <div className="company-avatar">{company.name.charAt(0)}</div>
                                        <span className="company-name">{company.name}</span>
                                    </td>
                                    <td className="text-right">{company.jobs}</td>
                                    <td className="text-right">{company.applicants.toLocaleString()}</td>
                                    <td className="text-right font-semibold">{company.offers}</td>
                                    <td className="text-right">
                                        <span className="ratio-badge">{company.ratio}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="empty-state-cell">
                                    <div className="empty-table-state">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                                        <p>No companies found matching your criteria</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompanyPerformanceTable;
