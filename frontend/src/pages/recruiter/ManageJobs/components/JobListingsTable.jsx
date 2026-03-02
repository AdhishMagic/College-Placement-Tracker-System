import React, { useState } from 'react';
import styles from '../ManageJobs.module.css';

const ActionDropdown = ({ job, onAction }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.actionWrapper} onMouseLeave={() => setIsOpen(false)}>
            <button
                className={styles.actionBtn}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Actions dropdown"
            >
                <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
            </button>
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <button className={styles.dropdownItem} onClick={() => onAction('view', job)}>
                        View Details
                    </button>
                    <button className={styles.dropdownItem} onClick={() => onAction('edit', job)}>
                        Edit Job
                    </button>
                    {job.status !== 'closed' && (
                        <button className={`${styles.dropdownItem} ${styles.danger}`} onClick={() => onAction('close', job)}>
                            Close Job
                        </button>
                    )}
                    {job.status === 'draft' && (
                        <button className={`${styles.dropdownItem} ${styles.danger}`} onClick={() => onAction('delete', job)}>
                            Delete Draft
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const JobPerformanceCard = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className={styles.metricsRow}>
            <span className={styles.metricBadge}>Applied<strong>{stats.applied}</strong></span>
            <span className={styles.metricBadge}>Shortlisted<strong>{stats.shortlisted}</strong></span>
            <span className={styles.metricBadge}>Interviewed<strong>{stats.interviewed}</strong></span>
            <span className={styles.metricBadge}>Offers<strong>{stats.offers}</strong></span>
        </div>
    );
};

const JobListingsTable = ({ jobs, selectedJobs, setSelectedJobs, onAction }) => {
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedJobs(jobs.map(job => job.id));
        } else {
            setSelectedJobs([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedJobs(prev =>
            prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
        );
    };

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return <span className={`${styles.badge} ${styles.active}`}>Active</span>;
            case 'draft':
                return <span className={`${styles.badge} ${styles.draft}`}>Draft</span>;
            case 'closed':
                return <span className={`${styles.badge} ${styles.closed}`}>Closed</span>;
            default:
                return <span className={styles.badge}>{status}</span>;
        }
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.jobTable}>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={selectedJobs.length === jobs.length && jobs.length > 0}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th>Job Details</th>
                        <th>Package</th>
                        <th>Applications</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th align="center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={selectedJobs.includes(job.id)}
                                    onChange={() => handleSelectRow(job.id)}
                                />
                            </td>
                            <td>
                                <div className={styles.jobTitle}>{job.title}</div>
                                <div className={styles.jobDepartment}>{job.department}</div>
                                {job.performanceStats && (
                                    <JobPerformanceCard stats={job.performanceStats} />
                                )}
                            </td>
                            <td>
                                <div>{job.package}</div>
                            </td>
                            <td>
                                <strong>{job.applicantsCount}</strong>
                            </td>
                            <td>
                                {getStatusBadge(job.status)}
                            </td>
                            <td>
                                {new Date(job.deadline).toLocaleDateString()}
                            </td>
                            <td align="center">
                                <ActionDropdown job={job} onAction={onAction} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobListingsTable;
