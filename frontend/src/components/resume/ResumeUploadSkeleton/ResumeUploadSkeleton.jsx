import styles from './ResumeUploadSkeleton.module.css';

/**
 * ResumeUploadSkeleton
 * Shimmer loading placeholder for the resume page.
 */
const ResumeUploadSkeleton = () => {
    return (
        <div className={styles.skeleton}>
            {/* Header skeleton */}
            <div className={styles.headerRow}>
                <div className={`${styles.bone} ${styles.titleBone}`} />
                <div className={`${styles.bone} ${styles.badgeBone}`} />
            </div>

            {/* Dropzone skeleton */}
            <div className={styles.dropzoneBone}>
                <div className={`${styles.bone} ${styles.iconBone}`} />
                <div className={`${styles.bone} ${styles.textBone}`} />
                <div className={`${styles.bone} ${styles.subtextBone}`} />
            </div>
        </div>
    );
};

export default ResumeUploadSkeleton;
