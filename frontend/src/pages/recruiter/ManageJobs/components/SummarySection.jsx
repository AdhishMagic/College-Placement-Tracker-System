import React from 'react';
import styles from '../ManageJobs.module.css';

const SummarySection = ({ summaries }) => {
    return (
        <div className={styles.summaryGrid}>
            <div className={`${styles.summaryCard} ${styles.activeJobs}`}>
                <span className={styles.summaryLabel}>Total Active Jobs</span>
                <span className={styles.summaryValue}>{summaries.active || 0}</span>
            </div>
            <div className={`${styles.summaryCard} ${styles.totalApps}`}>
                <span className={styles.summaryLabel}>Total Applications</span>
                <span className={styles.summaryValue}>{summaries.applications || 0}</span>
            </div>
            <div className={`${styles.summaryCard} ${styles.jobsClosed}`}>
                <span className={styles.summaryLabel}>Jobs Closed</span>
                <span className={styles.summaryValue}>{summaries.closed || 0}</span>
            </div>
            <div className={`${styles.summaryCard} ${styles.draftJobs}`}>
                <span className={styles.summaryLabel}>Draft Jobs</span>
                <span className={styles.summaryValue}>{summaries.draft || 0}</span>
            </div>
        </div>
    );
};

export default SummarySection;
