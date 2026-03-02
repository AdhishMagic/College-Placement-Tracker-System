import React from 'react';
import styles from './SharedComponents.module.css';

const JobInfoSection = ({ data, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Job Title *</label>
                <input
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer Intern"
                    className={styles.input}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Job Role *</label>
                <select
                    name="role"
                    value={data.role}
                    onChange={handleChange}
                    className={styles.select}
                    required
                >
                    <option value="" disabled>Select a role...</option>
                    <option value="SDE">Software Development Engineer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Consultant">Consultant</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Location *</label>
                <input
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore, Remote"
                    className={styles.input}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Employment Type *</label>
                <select
                    name="employmentType"
                    value={data.employmentType}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Total CTC / Stipend *</label>
                <input
                    type="text"
                    name="ctc"
                    value={data.ctc}
                    onChange={handleChange}
                    placeholder="e.g. 12 LPA or 50k / month"
                    className={styles.input}
                    required
                />
            </div>
        </div>
    );
};

export default JobInfoSection;
