/**
 * ApplicationSummary
 * Displays four KPI stat cards for application tracking:
 *   Total Applications | Shortlisted | Interviews Scheduled | Offers Received
 */
import { useSelector } from 'react-redux';
import { selectApplicationSummary } from '../../../features/applications/applicationsSlice';
import './ApplicationSummary.css';

/* ── SVG Icon helpers ── */
const SendIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const ShortlistIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const AwardIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
);

const ApplicationSummary = () => {
    const { total, shortlisted, interviews, offers } = useSelector(selectApplicationSummary);

    const cards = [
        {
            id: 'total',
            label: 'Total Applications',
            value: total,
            icon: <SendIcon />,
            color: 'primary',
        },
        {
            id: 'shortlisted',
            label: 'Shortlisted',
            value: shortlisted,
            icon: <ShortlistIcon />,
            color: 'warning',
        },
        {
            id: 'interviews',
            label: 'Interviews Scheduled',
            value: interviews,
            icon: <CalendarIcon />,
            color: 'purple',
        },
        {
            id: 'offers',
            label: 'Offers Received',
            value: offers,
            icon: <AwardIcon />,
            color: 'success',
        },
    ];

    return (
        <section className="app-summary" aria-label="Application statistics">
            {cards.map((c) => (
                <div key={c.id} className={`app-summary__card app-summary__card--${c.color}`}>
                    <div className="app-summary__icon-wrap">
                        {c.icon}
                    </div>
                    <div className="app-summary__info">
                        <p className="app-summary__label">{c.label}</p>
                        <h3 className="app-summary__value">{c.value}</h3>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ApplicationSummary;
