import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUser, FiMail, FiPhone, FiMapPin, FiCalendar,
    FiBook, FiAward, FiCode, FiHeart, FiFolder,
    FiEdit3, FiCheck, FiX, FiPlus, FiSave,
    FiExternalLink, FiAlertCircle
} from 'react-icons/fi';
import { usePageMeta } from '../../../hooks';
import {
    fetchStudentProfile,
    saveStudentProfile,
    enterEditMode,
    cancelEditMode,
    updatePersonalField,
    updateAcademicField,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addProjectTech,
    removeProjectTech,
    addCertification,
    updateCertification,
    removeCertification,
    selectProfileData,
    selectEditData,
    selectEditMode,
    selectProfileLoading,
    selectProfileSaving,
    selectProfileError,
    selectSaveSuccess,
    selectValidationErrors,
    setValidationErrors,
    clearSaveSuccess,
} from '../../../features/studentProfile/studentProfileSlice';
import useProfileCompletion from '../../../hooks/useProfileCompletion';
import {
    FormField,
    SectionCard,
    TagInput,
    CircularProgress,
    ProjectCard,
    ProfileSkeleton,
} from '../../../components/profile';
import Button from '../../../components/ui/Button/Button';
import styles from './StudentProfile.module.css';

const StudentProfile = () => {
    usePageMeta('My Profile', ['Student', 'Profile']);

    const dispatch = useDispatch();
    const profileData = useSelector(selectProfileData);
    const editData = useSelector(selectEditData);
    const editMode = useSelector(selectEditMode);
    const loading = useSelector(selectProfileLoading);
    const saving = useSelector(selectProfileSaving);
    const error = useSelector(selectProfileError);
    const saveSuccess = useSelector(selectSaveSuccess);
    const validationErrors = useSelector(selectValidationErrors);

    // Use display data — editData when editing, profileData otherwise
    const displayData = editMode ? editData : profileData;
    const { percentage, sections } = useProfileCompletion(displayData);

    useEffect(() => {
        dispatch(fetchStudentProfile());
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

        if (!data.personal.fullName?.trim()) errors['personal.fullName'] = 'Full name is required';
        if (!data.personal.email?.trim()) errors['personal.email'] = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.personal.email)) errors['personal.email'] = 'Invalid email format';
        if (!data.personal.phone?.trim()) errors['personal.phone'] = 'Phone is required';

        if (!data.academic.university?.trim()) errors['academic.university'] = 'University is required';
        if (!data.academic.degree?.trim()) errors['academic.degree'] = 'Degree is required';
        if (!data.academic.department?.trim()) errors['academic.department'] = 'Department is required';
        if (data.academic.cgpa && (data.academic.cgpa < 0 || data.academic.cgpa > 10))
            errors['academic.cgpa'] = 'CGPA must be between 0 and 10';

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
            dispatch(saveStudentProfile(editData));
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
    if (loading) return <ProfileSkeleton />;

    // ---- Error State ----
    if (error) {
        return (
            <div className={styles.errorState}>
                <FiAlertCircle className={styles.errorIcon} />
                <h3>Unable to Load Profile</h3>
                <p>{error}</p>
                <Button variant="secondary" onClick={() => dispatch(fetchStudentProfile())}>
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
                        <FiCheck />
                        <span>Profile saved successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ============================================
                1. PROFILE HEADER SECTION
                ============================================ */}
            <motion.div className={styles.profileHeader} variants={itemVariants}>
                <div className={styles.headerLeft}>
                    <div className={styles.avatar}>
                        {displayData.personal.avatarUrl ? (
                            <img src={displayData.personal.avatarUrl} alt="Profile" />
                        ) : (
                            <div className={styles.avatarFallback}>
                                <FiUser />
                            </div>
                        )}
                        {editMode && (
                            <button className={styles.avatarEdit} aria-label="Change photo">
                                <FiEdit3 />
                            </button>
                        )}
                    </div>
                    <div className={styles.headerInfo}>
                        <h1 className={styles.userName}>
                            {displayData.personal.fullName || 'Student Name'}
                        </h1>
                        <p className={styles.userMeta}>
                            <span>{displayData.academic.department || 'Department'}</span>
                            <span className={styles.metaDivider}>•</span>
                            <span>Class of {displayData.academic.graduationYear}</span>
                        </p>
                        <p className={styles.userEmail}>
                            <FiMail />
                            {displayData.personal.email || 'email@university.edu'}
                        </p>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <CircularProgress
                        percentage={percentage}
                        size={110}
                        strokeWidth={8}
                        label="Profile Complete"
                    />
                </div>
            </motion.div>

            {/* ---- Edit/Save Action Bar ---- */}
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
                        Edit Profile
                    </Button>
                )}
            </motion.div>

            {/* ---- Completion Breakdown (visible in edit mode) ---- */}
            <AnimatePresence>
                {editMode && (
                    <motion.div
                        className={styles.completionBreakdown}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h4 className={styles.breakdownTitle}>Profile Completion Breakdown</h4>
                        <div className={styles.breakdownGrid}>
                            {sections.map((s) => (
                                <div key={s.label} className={styles.breakdownItem}>
                                    <div className={styles.breakdownHeader}>
                                        <span className={styles.breakdownLabel}>{s.label}</span>
                                        <span className={styles.breakdownScore}>{s.score}%</span>
                                    </div>
                                    <div className={styles.breakdownBar}>
                                        <div
                                            className={styles.breakdownFill}
                                            style={{ width: `${s.score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ============================================
                2. PERSONAL INFORMATION SECTION
                ============================================ */}
            <motion.div variants={itemVariants}>
                <SectionCard title="Personal Information" icon={<FiUser />}>
                    <div className={styles.fieldGrid}>
                        <FormField
                            label="Full Name"
                            value={displayData.personal.fullName}
                            editMode={editMode}
                            error={validationErrors['personal.fullName']}
                            icon={<FiUser />}
                            required
                            placeholder="Enter full name"
                            onChange={(val) => dispatch(updatePersonalField({ field: 'fullName', value: val }))}
                        />
                        <FormField
                            label="Email Address"
                            value={displayData.personal.email}
                            editMode={editMode}
                            error={validationErrors['personal.email']}
                            type="email"
                            icon={<FiMail />}
                            required
                            placeholder="you@university.edu"
                            onChange={(val) => dispatch(updatePersonalField({ field: 'email', value: val }))}
                        />
                        <FormField
                            label="Phone Number"
                            value={displayData.personal.phone}
                            editMode={editMode}
                            error={validationErrors['personal.phone']}
                            type="tel"
                            icon={<FiPhone />}
                            required
                            placeholder="+91 XXXXX XXXXX"
                            onChange={(val) => dispatch(updatePersonalField({ field: 'phone', value: val }))}
                        />
                        <FormField
                            label="Date of Birth"
                            value={displayData.personal.dateOfBirth}
                            editMode={editMode}
                            type="date"
                            icon={<FiCalendar />}
                            onChange={(val) => dispatch(updatePersonalField({ field: 'dateOfBirth', value: val }))}
                        />
                        <FormField
                            label="Address"
                            value={displayData.personal.address}
                            editMode={editMode}
                            type="textarea"
                            icon={<FiMapPin />}
                            placeholder="Enter your address"
                            className={styles.fullSpan}
                            onChange={(val) => dispatch(updatePersonalField({ field: 'address', value: val }))}
                        />
                    </div>
                </SectionCard>
            </motion.div>

            {/* ============================================
                3. ACADEMIC INFORMATION SECTION
                ============================================ */}
            <motion.div variants={itemVariants}>
                <SectionCard title="Academic Information" icon={<FiBook />}>
                    <div className={styles.fieldGrid}>
                        <FormField
                            label="University / College"
                            value={displayData.academic.university}
                            editMode={editMode}
                            error={validationErrors['academic.university']}
                            required
                            placeholder="Enter university name"
                            onChange={(val) => dispatch(updateAcademicField({ field: 'university', value: val }))}
                        />
                        <FormField
                            label="Degree"
                            value={displayData.academic.degree}
                            editMode={editMode}
                            error={validationErrors['academic.degree']}
                            required
                            placeholder="e.g., B.Tech, M.Sc"
                            onChange={(val) => dispatch(updateAcademicField({ field: 'degree', value: val }))}
                        />
                        <FormField
                            label="Department"
                            value={displayData.academic.department}
                            editMode={editMode}
                            error={validationErrors['academic.department']}
                            required
                            placeholder="e.g., Computer Science"
                            onChange={(val) => dispatch(updateAcademicField({ field: 'department', value: val }))}
                        />
                        <FormField
                            label="CGPA"
                            value={displayData.academic.cgpa?.toString()}
                            editMode={editMode}
                            error={validationErrors['academic.cgpa']}
                            type="number"
                            placeholder="e.g., 8.5"
                            helperText="Out of 10.0"
                            onChange={(val) => dispatch(updateAcademicField({ field: 'cgpa', value: parseFloat(val) || 0 }))}
                        />
                        <FormField
                            label="Backlog Count"
                            value={displayData.academic.backlogCount?.toString()}
                            editMode={editMode}
                            type="number"
                            placeholder="0"
                            helperText="Active backlogs"
                            onChange={(val) => dispatch(updateAcademicField({ field: 'backlogCount', value: parseInt(val) || 0 }))}
                        />
                        <FormField
                            label="Graduation Year"
                            value={displayData.academic.graduationYear?.toString()}
                            editMode={editMode}
                            type="number"
                            placeholder="e.g., 2026"
                            onChange={(val) => dispatch(updateAcademicField({ field: 'graduationYear', value: parseInt(val) || 0 }))}
                        />
                    </div>
                </SectionCard>
            </motion.div>

            {/* ============================================
                4. SKILLS SECTION
                ============================================ */}
            <motion.div variants={itemVariants}>
                <SectionCard title="Skills" icon={<FiCode />}>
                    <div className={styles.skillsContainer}>
                        <div className={styles.skillCategory}>
                            <h4 className={styles.skillLabel}>
                                <FiCode className={styles.skillIcon} />
                                Technical Skills
                            </h4>
                            <TagInput
                                tags={displayData.skills?.technical || []}
                                editMode={editMode}
                                variant="primary"
                                placeholder="e.g., React, Python, Docker..."
                                onAdd={(skill) => dispatch(addSkill({ category: 'technical', skill }))}
                                onRemove={(skill) => dispatch(removeSkill({ category: 'technical', skill }))}
                            />
                        </div>
                        <div className={styles.skillDivider} />
                        <div className={styles.skillCategory}>
                            <h4 className={styles.skillLabel}>
                                <FiHeart className={styles.skillIcon} />
                                Soft Skills
                            </h4>
                            <TagInput
                                tags={displayData.skills?.soft || []}
                                editMode={editMode}
                                variant="secondary"
                                placeholder="e.g., Leadership, Communication..."
                                onAdd={(skill) => dispatch(addSkill({ category: 'soft', skill }))}
                                onRemove={(skill) => dispatch(removeSkill({ category: 'soft', skill }))}
                            />
                        </div>
                    </div>
                </SectionCard>
            </motion.div>

            {/* ============================================
                5. PROJECTS SECTION
                ============================================ */}
            <motion.div variants={itemVariants}>
                <SectionCard
                    title="Projects"
                    icon={<FiFolder />}
                    isEmpty={displayData.projects?.length === 0}
                    emptyMessage="No projects added yet. Showcase your work to stand out!"
                    emptyAction={
                        editMode ? (
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<FiPlus />}
                                onClick={() => dispatch(addProject({}))}
                            >
                                Add Project
                            </Button>
                        ) : null
                    }
                    action={
                        editMode && displayData.projects?.length > 0 ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<FiPlus />}
                                onClick={() => dispatch(addProject({}))}
                            >
                                Add
                            </Button>
                        ) : null
                    }
                >
                    <div className={styles.projectsGrid}>
                        {displayData.projects?.map((project) => (
                            <div key={project.id}>
                                {editMode ? (
                                    <div className={styles.projectEditCard}>
                                        <div className={styles.projectEditHeader}>
                                            <h4>Edit Project</h4>
                                            <button
                                                className={styles.removeProjectBtn}
                                                onClick={() => dispatch(removeProject(project.id))}
                                                aria-label="Remove project"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                        <FormField
                                            label="Title"
                                            value={project.title}
                                            editMode
                                            required
                                            placeholder="Project title"
                                            onChange={(val) => dispatch(updateProject({ id: project.id, field: 'title', value: val }))}
                                        />
                                        <FormField
                                            label="Description"
                                            value={project.description}
                                            editMode
                                            type="textarea"
                                            placeholder="Brief description of the project"
                                            onChange={(val) => dispatch(updateProject({ id: project.id, field: 'description', value: val }))}
                                        />
                                        <div className={styles.projectTechEdit}>
                                            <span className={styles.projectTechLabel}>Technologies</span>
                                            <TagInput
                                                tags={project.technologies || []}
                                                editMode
                                                variant="primary"
                                                placeholder="Add technology..."
                                                onAdd={(tech) => dispatch(addProjectTech({ id: project.id, tech }))}
                                                onRemove={(tech) => dispatch(removeProjectTech({ id: project.id, tech }))}
                                            />
                                        </div>
                                        <div className={styles.projectLinksEdit}>
                                            <FormField
                                                label="GitHub Link"
                                                value={project.githubLink}
                                                editMode
                                                placeholder="https://github.com/..."
                                                onChange={(val) => dispatch(updateProject({ id: project.id, field: 'githubLink', value: val }))}
                                            />
                                            <FormField
                                                label="Portfolio / Live Link"
                                                value={project.portfolioLink}
                                                editMode
                                                placeholder="https://..."
                                                onChange={(val) => dispatch(updateProject({ id: project.id, field: 'portfolioLink', value: val }))}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <ProjectCard project={project} editMode={false} />
                                )}
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </motion.div>

            {/* ============================================
                6. CERTIFICATIONS SECTION
                ============================================ */}
            <motion.div variants={itemVariants}>
                <SectionCard
                    title="Certifications"
                    icon={<FiAward />}
                    isEmpty={displayData.certifications?.length === 0}
                    emptyMessage="No certifications added yet. Add your credentials to boost your profile!"
                    emptyAction={
                        editMode ? (
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<FiPlus />}
                                onClick={() => dispatch(addCertification({}))}
                            >
                                Add Certification
                            </Button>
                        ) : null
                    }
                    action={
                        editMode && displayData.certifications?.length > 0 ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<FiPlus />}
                                onClick={() => dispatch(addCertification({}))}
                            >
                                Add
                            </Button>
                        ) : null
                    }
                >
                    <div className={styles.certGrid}>
                        {displayData.certifications?.map((cert) => (
                            <div key={cert.id} className={styles.certCard}>
                                {editMode ? (
                                    <>
                                        <div className={styles.certEditHeader}>
                                            <h5>Edit Certification</h5>
                                            <button
                                                className={styles.removeProjectBtn}
                                                onClick={() => dispatch(removeCertification(cert.id))}
                                                aria-label="Remove certification"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                        <FormField
                                            label="Title"
                                            value={cert.title}
                                            editMode
                                            required
                                            placeholder="Certification name"
                                            onChange={(val) => dispatch(updateCertification({ id: cert.id, field: 'title', value: val }))}
                                        />
                                        <FormField
                                            label="Issuer"
                                            value={cert.issuer}
                                            editMode
                                            placeholder="Issuing organization"
                                            onChange={(val) => dispatch(updateCertification({ id: cert.id, field: 'issuer', value: val }))}
                                        />
                                        <FormField
                                            label="Date"
                                            value={cert.date}
                                            editMode
                                            type="month"
                                            onChange={(val) => dispatch(updateCertification({ id: cert.id, field: 'date', value: val }))}
                                        />
                                        <FormField
                                            label="Credential URL"
                                            value={cert.credentialUrl}
                                            editMode
                                            placeholder="https://..."
                                            onChange={(val) => dispatch(updateCertification({ id: cert.id, field: 'credentialUrl', value: val }))}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.certViewHeader}>
                                            <div className={styles.certBadge}>
                                                <FiAward />
                                            </div>
                                            <div>
                                                <h4 className={styles.certTitle}>{cert.title}</h4>
                                                <p className={styles.certIssuer}>{cert.issuer}</p>
                                            </div>
                                        </div>
                                        <div className={styles.certViewFooter}>
                                            {cert.date && (
                                                <span className={styles.certDate}>
                                                    <FiCalendar />
                                                    {new Date(cert.date + '-01').toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                    })}
                                                </span>
                                            )}
                                            {cert.credentialUrl && (
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.certLink}
                                                >
                                                    <FiExternalLink />
                                                    Verify
                                                </a>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
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

export default StudentProfile;
