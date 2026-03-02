import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { usePageMeta } from '../../../hooks';
import {
    uploadDocument,
    deleteDocument,
    openDeleteModal,
    closeDeleteModal,
    clearUploadError,
    selectUploadStatus,
    selectUploadProgress,
    selectUploadedFile,
    selectUploadError,
    selectDeleteModalOpen,
} from '../../../features/resume/documentUploadSlice';
import {
    ResumeDropzone,
    UploadProgress,
    ResumeFileCard,
    DeleteConfirmModal,
    ResumeUploadSkeleton,
} from '../../../components/resume';
import Badge from '../../../components/ui/Badge/Badge';
import Button from '../../../components/ui/Button/Button';
import styles from './StudentResume.module.css';

/**
 * StudentResume Page
 * Full resume upload & management experience.
 */
const StudentResume = () => {
    usePageMeta('My Resume', ['Student', 'Resume']);

    const dispatch = useDispatch();
    const uploadStatus = useSelector(selectUploadStatus);
    const progress = useSelector(selectUploadProgress);
    const uploadedFile = useSelector(selectUploadedFile);
    const error = useSelector(selectUploadError);
    const deleteModalOpen = useSelector(selectDeleteModalOpen);

    const hasFile = uploadStatus === 'uploaded' && uploadedFile;
    const isUploading = uploadStatus === 'uploading';
    const hasFailed = uploadStatus === 'failed';

    // ---- Handlers ----
    const handleFileSelect = useCallback((file) => {
        dispatch(uploadDocument(file));
    }, [dispatch]);

    const handleReplace = useCallback(() => {
        // Trigger file input via a hidden mechanism — re-render dropzone
        // The compact dropzone below handles this
    }, []);

    const handleDeleteClick = useCallback(() => {
        dispatch(openDeleteModal());
    }, [dispatch]);

    const handleDeleteConfirm = useCallback(() => {
        dispatch(deleteDocument());
    }, [dispatch]);

    const handleDeleteCancel = useCallback(() => {
        dispatch(closeDeleteModal());
    }, [dispatch]);

    const handleClearError = useCallback(() => {
        dispatch(clearUploadError());
    }, [dispatch]);

    // Status badge logic
    const getStatusBadge = () => {
        switch (uploadStatus) {
            case 'uploaded':
                return <Badge variant="success" size="md">Uploaded</Badge>;
            case 'uploading':
                return <Badge variant="warning" size="md">Processing</Badge>;
            case 'failed':
                return <Badge variant="danger" size="md">Failed</Badge>;
            default:
                return <Badge variant="neutral" size="md">No Resume</Badge>;
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    };

    return (
        <motion.div
            className={styles.resumePage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* ============================================
                PAGE HEADER
                ============================================ */}
            <motion.div className={styles.pageHeader} variants={itemVariants}>
                <div className={styles.headerLeft}>
                    <div className={styles.headerIcon}>
                        <FiFileText />
                    </div>
                    <div>
                        <h1 className={styles.pageTitle}>My Resume</h1>
                        <p className={styles.pageSubtitle}>
                            Upload and manage your resume for placement applications
                        </p>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    {getStatusBadge()}
                </div>
            </motion.div>

            {/* ============================================
                SUCCESS TOAST
                ============================================ */}
            <AnimatePresence>
                {uploadStatus === 'uploaded' && uploadedFile && (
                    <motion.div
                        className={styles.successToast}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        key="success-toast"
                    >
                        <FiCheck />
                        <span>Resume uploaded successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ============================================
                ERROR ALERT
                ============================================ */}
            <AnimatePresence>
                {hasFailed && error && (
                    <motion.div
                        className={styles.errorAlert}
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        key="error-alert"
                    >
                        <div className={styles.errorContent}>
                            <FiAlertCircle className={styles.errorIcon} />
                            <div>
                                <p className={styles.errorTitle}>Upload Failed</p>
                                <p className={styles.errorMessage}>{error}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearError}
                        >
                            Retry
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ============================================
                MAIN CONTENT AREA
                ============================================ */}
            <motion.div variants={itemVariants}>
                {/* ---- Uploading State ---- */}
                <AnimatePresence mode="wait">
                    {isUploading && (
                        <UploadProgress
                            key="upload-progress"
                            progress={progress}
                            fileName={uploadedFile?.name || 'Resume'}
                        />
                    )}
                </AnimatePresence>

                {/* ---- Has Uploaded File ---- */}
                {hasFile && !isUploading && (
                    <div className={styles.uploadedLayout}>
                        <div className={styles.fileCardColumn}>
                            <ResumeFileCard
                                file={uploadedFile}
                                status={uploadStatus}
                                onReplace={handleReplace}
                                onDelete={handleDeleteClick}
                            />
                        </div>
                        <div className={styles.dropzoneColumn}>
                            <ResumeDropzone
                                onFileSelect={handleFileSelect}
                                compact
                                disabled={isUploading}
                            />
                        </div>
                    </div>
                )}

                {/* ---- Idle / No File ---- */}
                {!hasFile && !isUploading && (
                    <ResumeDropzone
                        onFileSelect={handleFileSelect}
                        disabled={isUploading}
                        error={hasFailed ? error : undefined}
                    />
                )}
            </motion.div>

            {/* ============================================
                FILE GUIDELINES
                ============================================ */}
            <motion.div className={styles.guidelines} variants={itemVariants}>
                <h4 className={styles.guidelinesTitle}>Resume Guidelines</h4>
                <ul className={styles.guidelinesList}>
                    <li>Upload your most recent and updated resume</li>
                    <li>Accepted formats: PDF, DOC, DOCX (max 5MB)</li>
                    <li>Use a clean, professional format for best results</li>
                    <li>Ensure your contact information is up to date</li>
                    <li>Your resume will be shared with recruiters during applications</li>
                </ul>
            </motion.div>

            {/* ============================================
                DELETE CONFIRMATION MODAL
                ============================================ */}
            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                fileName={uploadedFile?.name}
            />
        </motion.div>
    );
};

export default StudentResume;
