/**
 * ApplicationEmptyState
 * Displays contextual illustrations and messages for no results, errors, or no applications.
 */
import { useDispatch } from 'react-redux';
import { clearError, setSearchQuery, setStatusFilter } from '../../../features/applications/applicationsSlice';
import './ApplicationEmptyState.css';

/* ── SVG Illustrations (Inline to reduce dependencies) ── */
const EmptyIllustration = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="app-empty__img">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <circle cx="12" cy="14" r="3" />
        <path d="M12 11v-1" />
        <path d="M12 18v-1" />
        <path d="M9 14H8" />
        <path d="M16 14h-1" />
    </svg>
);

const SearchIllustration = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="app-empty__img">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
);

const ErrorIllustration = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="app-empty__img app-empty__img--error">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const CONFIG = {
    empty: {
        icon: <EmptyIllustration />,
        title: 'No Applications Yet',
        desc: "You haven't applied to any roles. Visit the eligibility tab to discover opportunities.",
        action: 'Browse Jobs',
        url: '/student/eligibility',
    },
    no_results: {
        icon: <SearchIllustration />,
        title: 'No Matches Found',
        desc: 'We couldn’t find any applications matching your current filters or search.',
        action: 'Clear Filters',
    },
    error: {
        icon: <ErrorIllustration />,
        title: 'Load Error',
        desc: 'There was a problem loading your applications. Please try again.',
        action: 'Dismiss',
    },
};

const ApplicationEmptyState = ({ type = 'empty' }) => {
    const dispatch = useDispatch();
    const cfg = CONFIG[type] || CONFIG.empty;

    const handleAction = () => {
        if (type === 'no_results') {
            dispatch(setSearchQuery(''));
            dispatch(setStatusFilter('all'));
        } else if (type === 'error') {
            dispatch(clearError());
        }
    };

    return (
        <div className="app-empty" role="region" aria-label="Empty state">
            <div className={`app-empty__icon-wrap app-empty__icon-wrap--${type}`}>
                {cfg.icon}
            </div>
            <h3 className="app-empty__title">{cfg.title}</h3>
            <p className="app-empty__desc">{cfg.desc}</p>
            {type === 'empty' ? (
                <a href={cfg.url} className="app-empty__action">
                    {cfg.action}
                </a>
            ) : (
                <button className="app-empty__action" onClick={handleAction}>
                    {cfg.action}
                </button>
            )}
        </div>
    );
};

export default ApplicationEmptyState;
