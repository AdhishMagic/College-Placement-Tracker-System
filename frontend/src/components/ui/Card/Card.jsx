import './Card.css';

/**
 * Card Component
 * Edway-inspired clean card with soft shadow.
 */
const Card = ({
    children,
    variant = 'default', // 'default' | 'bordered' | 'elevated'
    padding = 'md',
    className = '',
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`card card--${variant} card--pad-${padding} ${onClick ? 'card--clickable' : ''
                } ${className}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            {...rest}
        >
            {children}
        </div>
    );
};

/**
 * Card.Header
 */
Card.Header = ({ children, className = '' }) => (
    <div className={`card__header ${className}`}>{children}</div>
);

/**
 * Card.Body
 */
Card.Body = ({ children, className = '' }) => (
    <div className={`card__body ${className}`}>{children}</div>
);

/**
 * Card.Footer
 */
Card.Footer = ({ children, className = '' }) => (
    <div className={`card__footer ${className}`}>{children}</div>
);

export default Card;
