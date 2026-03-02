import styles from './ProfileSkeleton.module.css';

/**
 * ProfileSkeleton Component
 * Loading skeleton for the Student Profile page.
 * Mimics the full page layout while data loads.
 */
const ProfileSkeleton = () => {
    return (
        <div className={styles.skeleton}>
            {/* Header Skeleton */}
            <div className={styles.headerCard}>
                <div className={styles.avatarSkeleton} />
                <div className={styles.headerInfo}>
                    <div className={`${styles.bar} ${styles.barLg}`} />
                    <div className={`${styles.bar} ${styles.barMd}`} />
                    <div className={`${styles.bar} ${styles.barSm}`} />
                </div>
                <div className={styles.progressSkeleton}>
                    <div className={styles.circleSkeleton} />
                </div>
            </div>

            {/* Section Skeletons */}
            {[1, 2, 3].map((i) => (
                <div key={i} className={styles.sectionSkeleton}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.iconSkeleton} />
                        <div className={`${styles.bar} ${styles.barMd}`} />
                    </div>
                    <div className={styles.sectionBody}>
                        <div className={styles.fieldGrid}>
                            {[1, 2, 3, 4].map((j) => (
                                <div key={j} className={styles.fieldSkeleton}>
                                    <div className={`${styles.bar} ${styles.barXs}`} />
                                    <div className={`${styles.bar} ${styles.barMd}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {/* Tags Skeleton */}
            <div className={styles.sectionSkeleton}>
                <div className={styles.sectionHeader}>
                    <div className={styles.iconSkeleton} />
                    <div className={`${styles.bar} ${styles.barMd}`} />
                </div>
                <div className={styles.sectionBody}>
                    <div className={styles.tagRow}>
                        {[1, 2, 3, 4, 5].map((k) => (
                            <div key={k} className={styles.tagSkeleton} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
