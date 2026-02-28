import './StatCard.css';

/**
 * StatCard Component
 * Dashboard KPI card with icon, value, label, and optional trend indicator.
 */
const StatCard = ({
    icon,
    label,
    value,
    trend,       // e.g., '+12%'
    trendType,   // 'up' | 'down' | 'neutral'
    color = 'primary', // 'primary' | 'success' | 'warning' | 'danger' | 'info'
    className = '',
}) => {
    return (
        <div className={`stat-card stat-card--${color} ${className}`}>
            <div className="stat-card__icon-wrap">
                <span className="stat-card__icon">{icon}</span>
            </div>
            <div className="stat-card__content">
                <p className="stat-card__label">{label}</p>
                <h3 className="stat-card__value">{value}</h3>
                {trend && (
                    <span className={`stat-card__trend stat-card__trend--${trendType || 'neutral'}`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
};

export default StatCard;
