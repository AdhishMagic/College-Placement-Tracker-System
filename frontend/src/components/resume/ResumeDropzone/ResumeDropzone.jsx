import { useRef, useState, useCallback } from 'react';
import { FiUploadCloud, FiFile } from 'react-icons/fi';
import styles from './ResumeDropzone.module.css';

const ACCEPTED_EXTENSIONS = '.pdf,.doc,.docx';
const ACCEPTED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * ResumeDropzone
 * Drag-and-drop + browse file zone with validation.
 *
 * @param {Function} onFileSelect - Callback with the validated File object
 * @param {boolean}  disabled     - Disable interactions during upload
 * @param {string}   error        - External error message to display
 * @param {boolean}  compact      - Render a smaller version (when file is uploaded)
 */
const ResumeDropzone = ({ onFileSelect, disabled = false, error: externalError, compact = false }) => {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [validationError, setValidationError] = useState('');

    const displayError = externalError || validationError;

    const validateFile = useCallback((file) => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            setValidationError('Invalid file type. Please upload a PDF, DOC, or DOCX file.');
            return false;
        }
        if (file.size > MAX_SIZE) {
            setValidationError('File too large. Maximum size is 5MB.');
            return false;
        }
        setValidationError('');
        return true;
    }, []);

    const handleFile = useCallback((file) => {
        if (disabled) return;
        if (validateFile(file)) {
            onFileSelect(file);
        }
    }, [disabled, validateFile, onFileSelect]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (disabled) return;
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [disabled, handleFile]);

    const handleInputChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
        // Reset input so re-selecting the same file triggers onChange
        e.target.value = '';
    }, [handleFile]);

    const handleBrowseClick = useCallback(() => {
        if (!disabled && inputRef.current) {
            inputRef.current.click();
        }
    }, [disabled]);

    const handleKeyDown = useCallback((e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            handleBrowseClick();
        }
    }, [disabled, handleBrowseClick]);

    return (
        <div
            className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${disabled ? styles.disabled : ''} ${displayError ? styles.hasError : ''} ${compact ? styles.compact : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label="Upload resume file"
            aria-disabled={disabled}
        >
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleInputChange}
                className={styles.fileInput}
                tabIndex={-1}
                aria-hidden="true"
            />

            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    {compact ? <FiFile /> : <FiUploadCloud />}
                </div>

                <div className={styles.textGroup}>
                    <p className={styles.primaryText}>
                        {compact ? 'Upload a new resume' : 'Drag & drop your resume here'}
                    </p>
                    {!compact && (
                        <p className={styles.secondaryText}>
                            or <span className={styles.browseLink}>browse files</span>
                        </p>
                    )}
                </div>

                <div className={styles.rules}>
                    <span className={styles.ruleItem}>PDF, DOC, DOCX</span>
                    <span className={styles.ruleDivider}>•</span>
                    <span className={styles.ruleItem}>Max 5MB</span>
                </div>
            </div>

            {displayError && (
                <div className={styles.errorMessage} role="alert">
                    {displayError}
                </div>
            )}
        </div>
    );
};

export default ResumeDropzone;
