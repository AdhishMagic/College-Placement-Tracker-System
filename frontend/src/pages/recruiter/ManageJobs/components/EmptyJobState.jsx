import React from 'react';
import styles from '../ManageJobs.module.css';

const EmptyJobState = ({ filterApplied }) => {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            </div>
            <h3 className={styles.emptyStateTitle}>
                {filterApplied ? 'No jobs match your filters' : 'No jobs posted yet'}
            </h3>
            <p className={styles.emptyStateText}>
                {filterApplied
                    ? 'Try adjusting your search or filter parameters.'
                    : 'Ready to find the best talent? Create your first job posting now.'}
            </p>
            {!filterApplied && (
                <button className={styles.createBtn} style={{ margin: '0 auto' }}>
                    Create Job Posting
                </button>
            )}
        </div>
    );
};

export default EmptyJobState;
