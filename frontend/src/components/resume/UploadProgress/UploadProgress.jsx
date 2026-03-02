import { motion } from 'framer-motion';
import { FiFile } from 'react-icons/fi';
import styles from './UploadProgress.module.css';

/**
 * UploadProgress
 * Animated progress bar displayed during file upload.
 *
 * @param {number} progress - Upload percentage (0–100)
 * @param {string} fileName - Name of the file being uploaded
 */
const UploadProgress = ({ progress = 0, fileName = '' }) => {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.header}>
                <div className={styles.fileInfo}>
                    <FiFile className={styles.fileIcon} />
                    <span className={styles.fileName}>{fileName}</span>
                </div>
                <span className={styles.percentage}>{Math.round(progress)}%</span>
            </div>

            <div className={styles.trackWrapper}>
                <div className={styles.track}>
                    <motion.div
                        className={styles.fill}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </div>
            </div>

            <p className={styles.statusText}>
                {progress < 100 ? 'Uploading your resume…' : 'Processing…'}
            </p>
        </motion.div>
    );
};

export default UploadProgress;
