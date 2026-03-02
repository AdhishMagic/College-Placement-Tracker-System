import React from 'react';
import styles from '../ManageJobs.module.css';

const JobTableSkeleton = ({ rows = 5 }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.jobTable}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Job Details</th>
                        <th>Package</th>
                        <th>Applications</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rows)].map((_, index) => (
                        <tr key={index} className={styles.skeletonRow}>
                            <td><div className={styles.skeletonBox} style={{ width: '20px' }} /></td>
                            <td>
                                <div className={styles.skeletonBox} style={{ width: '60%', marginBottom: '8px' }} />
                                <div className={styles.skeletonBox} style={{ width: '40%' }} />
                            </td>
                            <td><div className={styles.skeletonBox} style={{ width: '80%' }} /></td>
                            <td><div className={styles.skeletonBox} style={{ width: '40px' }} /></td>
                            <td><div className={styles.skeletonBox} style={{ width: '60px', borderRadius: '12px' }} /></td>
                            <td><div className={styles.skeletonBox} style={{ width: '80px' }} /></td>
                            <td><div className={styles.skeletonBox} style={{ width: '30px' }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobTableSkeleton;
