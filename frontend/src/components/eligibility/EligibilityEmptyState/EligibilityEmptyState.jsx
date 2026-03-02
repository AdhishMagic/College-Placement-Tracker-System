/**
 * EligibilityEmptyState Component
 * Displayed when no jobs match the current view/filter.
 * Different messages for 'eligible' vs 'notEligible' tabs.
 */
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTab, selectEligibilityFilters, clearFilters } from '../../../features/eligibility/eligibilitySlice';
import './EligibilityEmptyState.css';

const EligibilityEmptyState = ({ type = 'no_results' }) => {
    const dispatch = useDispatch();
    const activeTab = useSelector(selectActiveTab);
    const filters = useSelector(selectEligibilityFilters);
    const hasFilters = filters.searchQuery || filters.company;

    const content = {
        no_results: {
            icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
            ),
            title: 'No Jobs Found',
            description: hasFilters
                ? 'No jobs match your current filters. Try adjusting your search or filters.'
                : activeTab === 'eligible'
                    ? 'No eligible jobs available at the moment. Check back soon!'
                    : 'Great news — you currently meet criteria for all available jobs!',
        },
        error: {
            icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            ),
            title: 'Something Went Wrong',
            description: 'We couldn\'t load your eligibility data. Please try again later.',
        },
        no_data: {
            icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
            ),
            title: 'No Placement Drives Yet',
            description: 'Placement drives haven\'t been posted yet. Stay tuned for updates!',
        },
    };

    const { icon, title, description } = content[type] || content.no_results;

    return (
        <div className="eligibility-empty" role="status">
            <div className="eligibility-empty__icon">{icon}</div>
            <h3 className="eligibility-empty__title">{title}</h3>
            <p className="eligibility-empty__description">{description}</p>
            {hasFilters && type === 'no_results' && (
                <button
                    className="eligibility-empty__clear-btn"
                    onClick={() => dispatch(clearFilters())}
                    id="empty-clear-filters"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                    Clear All Filters
                </button>
            )}
        </div>
    );
};

export default EligibilityEmptyState;
