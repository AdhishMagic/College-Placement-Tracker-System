import React from 'react';
import styles from './SharedComponents.module.css';
import MultiSelect from './MultiSelect';
import TagInput from './TagInput';

const DEPARTMENTS = [
    { value: 'CSE', label: 'Computer Science and Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'ECE', label: 'Electronics and Communication' },
    { value: 'EEE', label: 'Electrical and Electronics' },
    { value: 'MECH', label: 'Mechanical Engineering' },
    { value: 'CIVIL', label: 'Civil Engineering' }
];

const EligibilitySection = ({ data, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handleDepartmentsChange = (newDeps) => {
        onChange({ ...data, departments: newDeps });
    };

    const handleSkillsChange = (newSkills) => {
        onChange({ ...data, skills: newSkills });
    };

    return (
        <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Minimum CGPA</label>
                <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    name="minCgpa"
                    value={data.minCgpa}
                    onChange={handleChange}
                    placeholder="e.g. 7.5"
                    className={styles.input}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Allowed Backlogs</label>
                <input
                    type="number"
                    min="0"
                    name="backlogsAllowed"
                    value={data.backlogsAllowed}
                    onChange={handleChange}
                    placeholder="e.g. 0"
                    className={styles.input}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Graduation Year</label>
                <input
                    type="number"
                    name="graduationYear"
                    value={data.graduationYear}
                    onChange={handleChange}
                    placeholder="YYYY"
                    className={styles.input}
                />
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <MultiSelect
                    label="Eligible Departments *"
                    options={DEPARTMENTS}
                    selectedValues={data.departments}
                    onChange={handleDepartmentsChange}
                    placeholder="Select eligible branches..."
                />
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <TagInput
                    label="Required Skills"
                    tags={data.skills}
                    onChange={handleSkillsChange}
                    placeholder="Type a skill and press Enter or comma..."
                    hint="Press Enter or Comma to add a tag"
                />
            </div>
        </div>
    );
};

export default EligibilitySection;
