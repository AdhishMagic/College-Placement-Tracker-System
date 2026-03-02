import React from 'react';
import styles from './SharedComponents.module.css';

const JobDescriptionSection = ({ data, onChange }) => {
    return (
        <div className={styles.formGrid}>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Detailed Description *</label>
                <textarea
                    name="description"
                    value={data.description}
                    onChange={(e) => onChange(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter the comprehensive job description, responsibilities, and key requirements..."
                    className={styles.textarea}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Application Deadline *</label>
                <input
                    type="date"
                    name="deadline"
                    value={data.deadline}
                    onChange={(e) => onChange(prev => ({ ...prev, deadline: e.target.value }))}
                    className={styles.input}
                    required
                />
            </div>
        </div>
    );
};

export default JobDescriptionSection;
