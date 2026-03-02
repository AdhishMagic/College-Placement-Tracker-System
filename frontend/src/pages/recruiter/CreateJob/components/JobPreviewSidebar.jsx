import React from 'react';
import styles from './PreviewSidebar.module.css';

const JobPreviewSidebar = ({ previewData, onPublish, onSaveDraft, isPublishing, isSaving }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.actionPanel}>
                <h3 className={styles.panelTitle}>Actions</h3>
                <div className={styles.buttonGroup}>
                    <button
                        className={styles.btnDraft}
                        onClick={onSaveDraft}
                        disabled={isSaving || isPublishing}
                    >
                        {isSaving ? 'Saving...' : 'Save as Draft'}
                    </button>
                    <button
                        className={styles.btnPublish}
                        onClick={onPublish}
                        disabled={isSaving || isPublishing}
                    >
                        {isPublishing ? 'Publishing...' : 'Publish Job'}
                    </button>
                </div>
            </div>

            <div className={styles.previewCard}>
                <div className={styles.previewHeader}>
                    <h3 className={styles.previewTitle}>Live Preview</h3>
                    <span className={styles.previewBadge}>Student View</span>
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.jobHeader}>
                        <div className={styles.companyLogoPlaceholder}>L</div>
                        <div>
                            <h4 className={styles.jobTitle}>{previewData.title || 'Job Title'}</h4>
                            <p className={styles.companyName}>Your Company Name</p>
                        </div>
                    </div>

                    <div className={styles.tagsContainer}>
                        <span className={styles.tagIcon}>{previewData.location || 'Location'}</span>
                        <span className={styles.tagIcon}>{previewData.employmentType || 'Type'}</span>
                        <span className={styles.tagIcon}>{previewData.ctc || 'CTC'}</span>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.eligibilitySummary}>
                        <p><strong>Min CGPA:</strong> {previewData.eligibility.minCgpa || 'N/A'}</p>
                        <p><strong>Departments:</strong> {previewData.eligibility.departments.length > 0 ? previewData.eligibility.departments.join(', ') : 'All'}</p>
                    </div>

                    <p className={styles.deadlineInfo}>
                        {previewData.deadline ? `Closes on ${new Date(previewData.deadline).toLocaleDateString()}` : 'Deadline not set'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobPreviewSidebar;
