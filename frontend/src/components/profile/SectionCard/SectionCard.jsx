import { motion } from 'framer-motion';
import styles from './SectionCard.module.css';

/**
 * SectionCard Component
 * Structured white card section for profile page.
 * Wraps content in a clean container with title, icon, and optional action button.
 *
 * @param {string} title - Section heading
 * @param {React.ReactNode} icon - Section icon
 * @param {React.ReactNode} action - Optional action element (e.g., edit button)
 * @param {React.ReactNode} children - Section content
 * @param {string} className - Extra classnames
 * @param {boolean} isEmpty - Whether to show empty state
 * @param {string} emptyMessage - Custom empty state message
 * @param {React.ReactNode} emptyAction - Action for empty state
 */
const SectionCard = ({
    title,
    icon,
    action,
    children,
    className = '',
    isEmpty = false,
    emptyMessage = 'No data available',
    emptyAction,
}) => {
    return (
        <motion.section
            className={`${styles.sectionCard} ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
        >
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    {icon && <span className={styles.icon}>{icon}</span>}
                    <h3 className={styles.title}>{title}</h3>
                </div>
                {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.body}>
                {isEmpty ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect width="48" height="48" rx="12" fill="var(--surface-tertiary)" />
                                <path
                                    d="M24 16V32M16 24H32"
                                    stroke="var(--text-tertiary)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <p className={styles.emptyText}>{emptyMessage}</p>
                        {emptyAction && <div className={styles.emptyAction}>{emptyAction}</div>}
                    </div>
                ) : (
                    children
                )}
            </div>
        </motion.section>
    );
};

export default SectionCard;
