import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import Button from '../../ui/Button/Button';
import styles from './DeleteConfirmModal.module.css';

/**
 * DeleteConfirmModal
 * Confirmation dialog for destructive delete action.
 *
 * @param {boolean}  isOpen    - Controls visibility
 * @param {Function} onConfirm - Delete handler
 * @param {Function} onCancel  - Cancel / close handler
 * @param {string}   fileName  - Name of the file to be deleted
 */
const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel, fileName = 'this file' }) => {
    // Close on Escape key
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') onCancel();
    }, [onCancel]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.portal}>
                    {/* Overlay */}
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <motion.div
                        className={styles.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-modal-title"
                        aria-describedby="delete-modal-desc"
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <button
                            className={styles.closeBtn}
                            onClick={onCancel}
                            aria-label="Close dialog"
                        >
                            <FiX />
                        </button>

                        <div className={styles.iconWrapper}>
                            <FiAlertTriangle />
                        </div>

                        <h3 id="delete-modal-title" className={styles.title}>
                            Delete Resume?
                        </h3>

                        <p id="delete-modal-desc" className={styles.description}>
                            Are you sure you want to delete <strong>{fileName}</strong>?
                            This action cannot be undone and you will need to upload a new resume.
                        </p>

                        <div className={styles.actions}>
                            <Button
                                variant="outline"
                                size="md"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                size="md"
                                onClick={onConfirm}
                            >
                                Delete Resume
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DeleteConfirmModal;
