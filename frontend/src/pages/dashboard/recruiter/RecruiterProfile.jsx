import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiBriefcase, FiMail, FiPhone, FiMapPin,
    FiGlobe, FiUsers, FiEdit3, FiCheck, FiX, FiSave,
    FiAlertCircle, FiCamera, FiCheckCircle
} from 'react-icons/fi';
import { usePageMeta } from '../../../hooks';
import {
    fetchCompanyProfile,
    saveCompanyProfile,
    uploadCompanyLogo,
    enterEditMode,
    cancelEditMode,
    updateOverviewField,
    updateBasicInfoField,
    updateAboutField,
    updateHiringPrefField,
    addPreferredSkill,
    removePreferredSkill,
    addPreferredDepartment,
    removePreferredDepartment,
    setValidationErrors,
    clearSaveSuccess,
    selectCompanyData,
    selectCompanyEditData,
    selectCompanyEditMode,
    selectCompanyLoading,
    selectCompanySaving,
    selectCompanyError,
    selectCompanySaveSuccess,
    selectCompanyValidationErrors,
    selectCompanyLogoUploading
} from '../../../features/companyProfile/companyProfileSlice';
import {
    FormField,
    SectionCard,
    TagInput,
    ProfileSkeleton
} from '../../../components/profile';
import Button from '../../../components/ui/Button/Button';
import styles from './RecruiterProfile.module.css';

const RecruiterProfile = () => {
    usePageMeta('Company Profile', ['Recruiter', 'Profile']);

    const dispatch = useDispatch();
    const profileData = useSelector(selectCompanyData);
    const editData = useSelector(selectCompanyEditData);
    const editMode = useSelector(selectCompanyEditMode);
    const loading = useSelector(selectCompanyLoading);
    const saving = useSelector(selectCompanySaving);
    const logoUploading = useSelector(selectCompanyLogoUploading);
    const error = useSelector(selectCompanyError);
    const saveSuccess = useSelector(selectCompanySaveSuccess);
    const validationErrors = useSelector(selectCompanyValidationErrors);

    // Use display data — editData when editing, profileData otherwise
    const displayData = editMode ? editData : profileData;

    useEffect(() => {
        dispatch(fetchCompanyProfile());
    }, [dispatch]);

    // Clear success toast after 3 seconds
    useEffect(() => {
        if (saveSuccess) {
            const timer = setTimeout(() => dispatch(clearSaveSuccess()), 3000);
            return () => clearTimeout(timer);
        }
    }, [saveSuccess, dispatch]);

    // ---- Validation ----
    const validateProfile = useCallback(() => {
        const errors = {};
        const data = editData;
        if (!data) return false;

        if (!data.overview.companyName?.trim()) errors['overview.companyName'] = 'Company name is required';
        if (!data.basicInfo.contactEmail?.trim()) errors['basicInfo.contactEmail'] = 'Contact email is required';
        else if (!/\S+@\S+\.\S+/.test(data.basicInfo.contactEmail)) errors['basicInfo.contactEmail'] = 'Invalid email format';
        if (!data.basicInfo.contactPhone?.trim()) errors['basicInfo.contactPhone'] = 'Contact phone is required';
        if (data.hiringPreferences.minCGPA < 0 || data.hiringPreferences.minCGPA > 10) {
            errors['hiringPreferences.minCGPA'] = 'CGPA must be between 0 and 10';
        }

        if (Object.keys(errors).length > 0) {
            dispatch(setValidationErrors(errors));
            return false;
        }
        return true;
    }, [editData, dispatch]);

    // ---- Handlers ----
    const handleEdit = () => dispatch(enterEditMode());
    const handleCancel = () => dispatch(cancelEditMode());
    const handleSave = () => {
        if (validateProfile()) {
            dispatch(saveCompanyProfile(editData));
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(uploadCompanyLogo(file));
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    };

    // ---- Loading State ----
    if (loading || !displayData) return <ProfileSkeleton />;

    // ---- Error State ----
    if (error && !displayData) {
        return (
            <div className={styles.errorState}>
                <FiAlertCircle className={styles.errorIcon} />
                <h3>Unable to Load Profile</h3>
                <p>{error}</p>
                <Button variant="secondary" onClick={() => dispatch(fetchCompanyProfile())}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <motion.div
            className={styles.profilePage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* ---- Success Toast ---- */}
            <AnimatePresence>
                {saveSuccess && (
                    <motion.div
                        className={styles.successToast}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                    >
                        <FiCheckCircle size={20} />
                        <span>Profile saved successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ============================================
                1. PROFILE HEADER SECTION
                ============================================ */}
            <motion.div className={styles.profileHeader} variants={itemVariants}>
                <div className={styles.headerLeft}>
                    <div className={styles.logoContainer}>
                        {displayData.overview.logoUrl ? (
                            <img src={displayData.overview.logoUrl} alt="Company Logo" />
                        ) : (
                            <div className={styles.logoFallback}>
                                <FiBriefcase />
                            </div>
                        )}
                        {editMode && (
                            <label className={styles.logoEdit} aria-label="Change logo">
                                {logoUploading ? 'Uploading...' : <><FiCamera /> Change</>}
                                <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={logoUploading} />
                            </label>
                        )}
                    </div>
                    <div className={styles.headerInfo}>
                        <h1 className={styles.companyName}>
                            {displayData.overview.companyName || 'Company Name'}
                        </h1>
                        <p className={styles.companyMeta}>
                            <span>{displayData.overview.industry || 'Industry'}</span>
                            <span className={styles.metaDivider}>•</span>
                            <span>{displayData.overview.companySize || 'Size'} Employees</span>
                        </p>
                        {displayData.overview.website && (
                            <a
                                href={displayData.overview.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.companyLink}
                            >
                                <FiGlobe />
                                {new URL(displayData.overview.website).hostname}
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* ---- Action Bar ---- */}
            <motion.div className={styles.actionBar} variants={itemVariants}>
                {editMode ? (
                    <div className={styles.actionGroup}>
                        <Button
                            variant="outline"
                            size="md"
                            icon={<FiX />}
                            onClick={handleCancel}
                            disabled={saving}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="secondary"
                            size="md"
                            icon={<FiSave />}
                            onClick={handleSave}
                            loading={saving}
                        >
                            Save Changes
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="secondary"
                        size="md"
                        icon={<FiEdit3 />}
                        onClick={handleEdit}
                    >
                        Edit Company Profile
                    </Button>
                )}
            </motion.div>

            {/* ============================================
                2. BASIC INFORMATION SECTION
                ============================================ */}
            <motion.div variants={itemVariants}>
                <SectionCard title="Basic Information" icon={<FiBriefcase />}>
                    <div className={styles.fieldGrid}>
                        <FormField
                            label="Company Name"
                            value={displayData.overview.companyName}
                            editMode={editMode}
                            error={validationErrors['overview.companyName']}
                            icon={<FiBriefcase />}
                            required
                            placeholder="Enter company name"
                            onChange={(val) => dispatch(updateOverviewField({ field: 'companyName', value: val }))}
                        />
                        <FormField
                            label="Industry"
                            value={displayData.overview.industry}
                            editMode={editMode}
                            icon={<FiBriefcase />}
                            placeholder="e.g., Software, Finance"
                            onChange={(val) => dispatch(updateOverviewField({ field: 'industry', value: val }))}
                        />
                        <FormField
                            label="Headquarters"
                            value={displayData.basicInfo.headquarters}
                            editMode={editMode}
                            icon={<FiMapPin />}
                            placeholder="City, Country"
                            onChange={(val) => dispatch(updateBasicInfoField({ field: 'headquarters', value: val }))}
                        />
                        <FormField
                            label="Company Size"
                            value={displayData.overview.companySize}
                            editMode={editMode}
                            icon={<FiUsers />}
                            placeholder="e.g., 100-500"
                            onChange={(val) => dispatch(updateOverviewField({ field: 'companySize', value: val }))}
                        />
                        <FormField
                            label="Contact Email"
                            value={displayData.basicInfo.contactEmail}
                            editMode={editMode}
                            error={validationErrors['basicInfo.contactEmail']}
                            icon={<FiMail />}
                            type="email"
                            required
                            placeholder="recruitment@company.com"
                            onChange={(val) => dispatch(updateBasicInfoField({ field: 'contactEmail', value: val }))}
                        />
                        <FormField
                            label="Contact Phone"
                            value={displayData.basicInfo.contactPhone}
                            editMode={editMode}
                            error={validationErrors['basicInfo.contactPhone']}
                            icon={<FiPhone />}
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            onChange={(val) => dispatch(updateBasicInfoField({ field: 'contactPhone', value: val }))}
                        />
                        <FormField
                            label="Website URL"
                            value={displayData.overview.website}
                            editMode={editMode}
                            icon={<FiGlobe />}
                            placeholder="https://company.com"
                            className={styles.fullSpan}
                            onChange={(val) => dispatch(updateOverviewField({ field: 'website', value: val }))}
                        />
                    </div>
                </SectionCard>
            </motion.div>

            {/* ============================================
                3. ABOUT COMPANY SECTION
                ============================================ */}
            <motion.div variants={itemVariants}>
                <SectionCard title="About Company" icon={<FiBriefcase />}>
                    <div className={styles.fieldGrid}>
                        <FormField
                            label="Description"
                            value={displayData.about.description}
                            editMode={editMode}
                            type="textarea"
                            placeholder="Describe your company, its mission, and its culture..."
                            className={styles.fullSpan}
                            onChange={(val) => dispatch(updateAboutField({ value: val }))}
                        />
                    </div>
                </SectionCard>
            </motion.div>

            {/* ============================================
                4. HIRING PREFERENCES SECTION
                ============================================ */}
            <motion.div variants={itemVariants}>
                <SectionCard title="Hiring Preferences" icon={<FiCheck />}>
                    <div className={styles.fieldGrid}>
                        <FormField
                            label="Minimum CGPA Requirement"
                            value={displayData.hiringPreferences.minCGPA?.toString()}
                            editMode={editMode}
                            error={validationErrors['hiringPreferences.minCGPA']}
                            type="number"
                            placeholder="e.g., 7.5"
                            helperText="On a 10.0 scale"
                            onChange={(val) => dispatch(updateHiringPrefField({ field: 'minCGPA', value: parseFloat(val) || 0 }))}
                        />
                        <FormField
                            label="Maximum Backlog Tolerance"
                            value={displayData.hiringPreferences.backlogTolerance?.toString()}
                            editMode={editMode}
                            type="number"
                            placeholder="e.g., 0"
                            helperText="Number of active backlogs allowed"
                            onChange={(val) => dispatch(updateHiringPrefField({ field: 'backlogTolerance', value: parseInt(val) || 0 }))}
                        />
                    </div>

                    <div className={styles.skillsContainer} style={{ marginTop: 'var(--spacing-6)' }}>
                        <div className={styles.skillCategory}>
                            <h4 className={styles.skillLabel}>Preferred Departments</h4>
                            <TagInput
                                tags={displayData.hiringPreferences.departments || []}
                                editMode={editMode}
                                variant="primary"
                                placeholder="e.g., Computer Science, Mechanical..."
                                onAdd={(dept) => dispatch(addPreferredDepartment(dept))}
                                onRemove={(dept) => dispatch(removePreferredDepartment(dept))}
                            />
                        </div>
                        <div className={styles.skillDivider} />
                        <div className={styles.skillCategory}>
                            <h4 className={styles.skillLabel}>Preferred Skills</h4>
                            <TagInput
                                tags={displayData.hiringPreferences.preferredSkills || []}
                                editMode={editMode}
                                variant="secondary"
                                placeholder="e.g., React, Node.js, Leadership..."
                                onAdd={(skill) => dispatch(addPreferredSkill(skill))}
                                onRemove={(skill) => dispatch(removePreferredSkill(skill))}
                            />
                        </div>
                    </div>
                </SectionCard>
            </motion.div>

            {/* ---- Sticky Save Bar (Edit Mode) ---- */}
            <AnimatePresence>
                {editMode && (
                    <motion.div
                        className={styles.stickyBar}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                    >
                        <div className={styles.stickyContent}>
                            <span className={styles.stickyLabel}>
                                <FiAlertCircle />
                                You have unsaved changes
                            </span>
                            <div className={styles.stickyActions}>
                                <Button variant="outline" size="sm" onClick={handleCancel} disabled={saving}>
                                    Discard
                                </Button>
                                <Button variant="secondary" size="sm" icon={<FiSave />} onClick={handleSave} loading={saving}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default RecruiterProfile;
