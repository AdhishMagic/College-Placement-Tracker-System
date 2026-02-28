import './Input.css';

/**
 * Input Component
 * Edway-inspired clean input with label and error support.
 */
const Input = ({
    label,
    type = 'text',
    error,
    helperText,
    icon,
    fullWidth = true,
    className = '',
    id,
    ...rest
}) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className={`input-group ${fullWidth ? 'input-group--full' : ''} ${className}`}>
            {label && (
                <label htmlFor={inputId} className="input-group__label">
                    {label}
                </label>
            )}
            <div className={`input-group__wrapper ${error ? 'input-group__wrapper--error' : ''}`}>
                {icon && <span className="input-group__icon">{icon}</span>}
                <input
                    id={inputId}
                    type={type}
                    className="input-group__input"
                    {...rest}
                />
            </div>
            {error && <p className="input-group__error">{error}</p>}
            {helperText && !error && <p className="input-group__helper">{helperText}</p>}
        </div>
    );
};

export default Input;
