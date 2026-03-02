import styles from './FormField.module.css';

/**
 * FormField Component
 * Reusable field wrapper for profile forms.
 * Displays label + value in view mode, label + input in edit mode.
 *
 * @param {string} label - Field label
 * @param {string} value - Current value (view mode)
 * @param {boolean} editMode - Whether in edit mode
 * @param {string} error - Validation error message
 * @param {string} type - Input type (text, email, date, number, textarea)
 * @param {function} onChange - Change handler (edit mode)
 * @param {string} placeholder - Input placeholder
 * @param {boolean} required - Whether field is required
 * @param {boolean} disabled - Whether field is disabled
 * @param {React.ReactNode} icon - Optional icon
 * @param {string} helperText - Helper text below field
 */
const FormField = ({
    label,
    value,
    editMode = false,
    error,
    type = 'text',
    onChange,
    placeholder = '',
    required = false,
    disabled = false,
    icon,
    helperText,
    id,
    className = '',
}) => {
    const fieldId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    if (!editMode) {
        return (
            <div className={`${styles.fieldGroup} ${className}`}>
                <span className={styles.label}>
                    {icon && <span className={styles.labelIcon}>{icon}</span>}
                    {label}
                </span>
                <span className={`${styles.value} ${!value ? styles.empty : ''}`}>
                    {value || 'Not provided'}
                </span>
            </div>
        );
    }

    return (
        <div className={`${styles.fieldGroup} ${styles.editable} ${error ? styles.hasError : ''} ${className}`}>
            <label htmlFor={fieldId} className={styles.label}>
                {icon && <span className={styles.labelIcon}>{icon}</span>}
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <div className={styles.inputWrapper}>
                {type === 'textarea' ? (
                    <textarea
                        id={fieldId}
                        className={`${styles.input} ${styles.textarea}`}
                        value={value || ''}
                        onChange={(e) => onChange?.(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={3}
                    />
                ) : (
                    <input
                        id={fieldId}
                        type={type}
                        className={styles.input}
                        value={value || ''}
                        onChange={(e) => onChange?.(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {helperText && !error && <p className={styles.helper}>{helperText}</p>}
        </div>
    );
};

export default FormField;
