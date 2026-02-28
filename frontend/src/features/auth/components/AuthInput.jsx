import { useState } from 'react';
import './AuthInput.css';

/**
 * AuthInput
 * Specialized input for auth module with password toggle and clear validation states.
 */
const AuthInput = ({
    label,
    type = 'text',
    error,
    helperText,
    id,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `auth-input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    const isPassword = type === 'password';
    const currentType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="auth-input-group">
            {label && (
                <label htmlFor={inputId} className="auth-input-group__label">
                    {label}
                </label>
            )}
            <div className={`auth-input-group__wrapper ${error ? 'auth-input-group__wrapper--error' : ''}`}>
                <input
                    id={inputId}
                    type={currentType}
                    className="auth-input-group__input"
                    {...rest}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="auth-input-group__toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? '👁️‍🗨️' : '👁️'}
                    </button>
                )}
            </div>
            {error && <p className="auth-input-group__error" role="alert">{error}</p>}
            {helperText && !error && <p className="auth-input-group__helper">{helperText}</p>}
        </div>
    );
};

export default AuthInput;
