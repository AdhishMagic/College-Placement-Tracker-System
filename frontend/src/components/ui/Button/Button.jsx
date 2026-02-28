import './Button.css';

/**
 * Button Component
 * Edway-inspired pill-shaped button with multiple variants.
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.fullWidth
 * @param {boolean} props.loading
 * @param {boolean} props.disabled
 * @param {React.ReactNode} props.icon
 * @param {React.ReactNode} props.children
 */
const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    icon,
    children,
    className = '',
    ...rest
}) => {
    return (
        <button
            className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${loading ? 'btn--loading' : ''
                } ${className}`}
            disabled={disabled || loading}
            {...rest}
        >
            {loading && <span className="btn__spinner" />}
            {icon && !loading && <span className="btn__icon">{icon}</span>}
            {children && <span className="btn__text">{children}</span>}
        </button>
    );
};

export default Button;
