import { FiFileText, FiRefreshCw, FiTrash2, FiCalendar, FiHardDrive } from 'react-icons/fi';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import styles from './ResumeFileCard.module.css';

/**
 * Formats bytes to a human-readable string.
 */
const formatFileSize = (bytes) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

/**
 * Returns the appropriate file type icon and label.
 */
const getFileTypeInfo = (type) => {
    if (type === 'application/pdf') return { label: 'PDF', className: 'pdf' };
    if (type === 'application/msword') return { label: 'DOC', className: 'doc' };
    if (type?.includes('wordprocessingml')) return { label: 'DOCX', className: 'doc' };
    return { label: 'FILE', className: 'generic' };
};

/**
 * Maps upload status to Badge variant.
 */
const STATUS_BADGE_MAP = {
    uploaded: { variant: 'success', label: 'Uploaded' },
    uploading: { variant: 'warning', label: 'Processing' },
    failed: { variant: 'danger', label: 'Failed' },
};

/**
 * ResumeFileCard
 * Displays uploaded file metadata with actions.
 *
 * @param {Object}   file       - { name, size, type, url, uploadedAt }
 * @param {string}   status     - 'uploaded' | 'uploading' | 'failed'
 * @param {Function} onReplace  - Handler for replace action
 * @param {Function} onDelete   - Handler for delete action
 */
const ResumeFileCard = ({ file, status = 'uploaded', onReplace, onDelete }) => {
    if (!file) return null;

    const typeInfo = getFileTypeInfo(file.type);
    const badgeInfo = STATUS_BADGE_MAP[status] || STATUS_BADGE_MAP.uploaded;
    const uploadDate = file.uploadedAt
        ? new Date(file.uploadedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        : '—';

    return (
        <div className={styles.card}>
            {/* ---- File Preview ---- */}
            <div className={styles.previewSection}>
                <div className={`${styles.fileIcon} ${styles[typeInfo.className]}`}>
                    <FiFileText />
                    <span className={styles.fileTypeLabel}>{typeInfo.label}</span>
                </div>
            </div>

            {/* ---- File Details ---- */}
            <div className={styles.detailsSection}>
                <div className={styles.nameRow}>
                    <h4 className={styles.fileName}>{file.name}</h4>
                    <Badge variant={badgeInfo.variant} size="sm">
                        {badgeInfo.label}
                    </Badge>
                </div>

                <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                        <FiHardDrive />
                        {formatFileSize(file.size)}
                    </span>
                    <span className={styles.metaDivider}>•</span>
                    <span className={styles.metaItem}>
                        <FiCalendar />
                        {uploadDate}
                    </span>
                </div>
            </div>

            {/* ---- Actions ---- */}
            <div className={styles.actions}>
                <Button
                    variant="outline"
                    size="sm"
                    icon={<FiRefreshCw />}
                    onClick={onReplace}
                    aria-label="Replace resume"
                >
                    Replace
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    icon={<FiTrash2 />}
                    onClick={onDelete}
                    aria-label="Delete resume"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default ResumeFileCard;
