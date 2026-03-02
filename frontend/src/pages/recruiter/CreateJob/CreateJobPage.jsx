import React, { useState } from 'react';
import PageHeader from './components/PageHeader';
import SectionCard from './components/SectionCard';
import JobInfoSection from './components/JobInfoSection';
import EligibilitySection from './components/EligibilitySection';
import JobDescriptionSection from './components/JobDescriptionSection';
import HiringStagesSection from './components/HiringStagesSection';
import JobPreviewSidebar from './components/JobPreviewSidebar';
import styles from './CreateJobPage.module.css';

const CreateJobPage = () => {
    // Basic local state to hold large form.
    // In a real app, you would eventually dispatch this to Redux.
    const [formData, setFormData] = useState({
        title: '',
        role: '',
        location: '',
        employmentType: 'Full-Time',
        ctc: '',
        eligibility: {
            minCgpa: '',
            backlogsAllowed: '',
            departments: [],
            skills: [],
            graduationYear: new Date().getFullYear(),
        },
        description: '',
        hiringStages: [{ id: 1, name: 'Aptitude Test', order: 1 }],
        deadline: ''
    });

    const [isPublishing, setIsPublishing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (action) => {
        // Validation could go here

        if (action === 'PUBLISH') {
            setIsPublishing(true);
            setTimeout(() => {
                setIsPublishing(false);
                setShowSuccess(true);
            }, 1500);
        } else if (action === 'DRAFT') {
            setIsSaving(true);
            setTimeout(() => setIsSaving(false), 1000);
        }
    };

    return (
        <div className={styles.createJobContainer}>
            <PageHeader
                title="Create New Job Posting"
                breadcrumbs={['Dashboard', 'Jobs', 'Create Profile']}
            />

            {showSuccess && (
                <div className={styles.successModalOverlay}>
                    <div className={styles.successModal}>
                        <div className={styles.successIcon}>✓</div>
                        <h2>Job Posted Successfully</h2>
                        <p>Your job "{formData.title || 'Untitled'}" is now live and visible to eligible students.</p>
                        <div className={styles.successActions}>
                            <button className={styles.btnSecondary} onClick={() => window.location.href = '/recruiter/dashboard'}>
                                Back to Dashboard
                            </button>
                            <button className={styles.btnPrimary} onClick={() => window.location.reload()}>
                                Create Another Job
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.layoutGrid}>
                <div className={styles.formMainColumn}>
                    <SectionCard title="Job Information" number="1">
                        <JobInfoSection data={formData} onChange={setFormData} />
                    </SectionCard>

                    <SectionCard
                        title="Eligibility Criteria"
                        number="2"
                        subtitle="Defines automated filtering rules for student applicants."
                    >
                        <EligibilitySection data={formData.eligibility} onChange={(newElig) => setFormData({ ...formData, eligibility: newElig })} />
                    </SectionCard>

                    <SectionCard title="Job Description" number="3">
                        <JobDescriptionSection data={formData} onChange={setFormData} />
                    </SectionCard>

                    <SectionCard title="Hiring Pipeline Stages" number="4" subtitle="Define the application journey for this role.">
                        <HiringStagesSection stages={formData.hiringStages} onChange={(newStages) => setFormData({ ...formData, hiringStages: newStages })} />
                    </SectionCard>
                </div>

                <aside className={styles.sidebarColumn}>
                    <JobPreviewSidebar
                        previewData={formData}
                        onPublish={() => handleSubmit('PUBLISH')}
                        onSaveDraft={() => handleSubmit('DRAFT')}
                        isPublishing={isPublishing}
                        isSaving={isSaving}
                    />
                </aside>
            </div>
        </div>
    );
};

export default CreateJobPage;
