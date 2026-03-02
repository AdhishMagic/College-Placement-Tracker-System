/**
 * EligibilityFilterBar Component
 * Search input, company dropdown filter, sort by selector, and tab switcher.
 */
import { useSelector, useDispatch } from 'react-redux';
import {
    selectEligibilityFilters,
    selectActiveTab,
    selectUniqueCompanies,
    selectEligibilitySummary,
    setSearchQuery,
    setCompanyFilter,
    setSortBy,
    setActiveTab,
    clearFilters,
} from '../../../features/eligibility/eligibilitySlice';
import './EligibilityFilterBar.css';

const EligibilityFilterBar = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectEligibilityFilters);
    const activeTab = useSelector(selectActiveTab);
    const companies = useSelector(selectUniqueCompanies);
    const summary = useSelector(selectEligibilitySummary);

    const hasActiveFilters = filters.searchQuery || filters.company || filters.sortBy !== 'date';

    return (
        <div className="eligibility-filter-bar">
            {/* ── Tab Switcher ── */}
            <div className="eligibility-filter-bar__tabs" role="tablist">
                <button
                    className={`eligibility-filter-bar__tab ${activeTab === 'eligible' ? 'eligibility-filter-bar__tab--active' : ''}`}
                    onClick={() => dispatch(setActiveTab('eligible'))}
                    role="tab"
                    aria-selected={activeTab === 'eligible'}
                    id="tab-eligible"
                >
                    <span className="eligibility-filter-bar__tab-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </span>
                    Eligible
                    <span className="eligibility-filter-bar__tab-count eligibility-filter-bar__tab-count--success">
                        {summary.totalEligible}
                    </span>
                </button>
                <button
                    className={`eligibility-filter-bar__tab ${activeTab === 'notEligible' ? 'eligibility-filter-bar__tab--active' : ''}`}
                    onClick={() => dispatch(setActiveTab('notEligible'))}
                    role="tab"
                    aria-selected={activeTab === 'notEligible'}
                    id="tab-not-eligible"
                >
                    <span className="eligibility-filter-bar__tab-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </span>
                    Not Eligible
                    <span className="eligibility-filter-bar__tab-count eligibility-filter-bar__tab-count--danger">
                        {summary.totalNotEligible}
                    </span>
                </button>
            </div>

            {/* ── Filter Controls ── */}
            <div className="eligibility-filter-bar__controls">
                {/* Search */}
                <div className="eligibility-filter-bar__search" id="eligibility-search">
                    <svg className="eligibility-filter-bar__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="eligibility-filter-bar__search-input"
                        placeholder="Search jobs, companies, locations..."
                        value={filters.searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        aria-label="Search jobs"
                        id="search-input-eligibility"
                    />
                    {filters.searchQuery && (
                        <button
                            className="eligibility-filter-bar__search-clear"
                            onClick={() => dispatch(setSearchQuery(''))}
                            aria-label="Clear search"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Company Filter */}
                <div className="eligibility-filter-bar__select-wrap" id="company-filter">
                    <svg className="eligibility-filter-bar__select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <select
                        className="eligibility-filter-bar__select"
                        value={filters.company}
                        onChange={(e) => dispatch(setCompanyFilter(e.target.value))}
                        aria-label="Filter by company"
                    >
                        <option value="">All Companies</option>
                        {companies.map((company) => (
                            <option key={company} value={company}>
                                {company}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort By */}
                <div className="eligibility-filter-bar__select-wrap" id="sort-filter">
                    <svg className="eligibility-filter-bar__select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="14" y2="12" />
                        <line x1="4" y1="18" x2="8" y2="18" />
                    </svg>
                    <select
                        className="eligibility-filter-bar__select"
                        value={filters.sortBy}
                        onChange={(e) => dispatch(setSortBy(e.target.value))}
                        aria-label="Sort jobs"
                    >
                        <option value="date">Newest First</option>
                        <option value="package_desc">Package: High → Low</option>
                        <option value="package_asc">Package: Low → High</option>
                    </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        className="eligibility-filter-bar__clear-btn"
                        onClick={() => dispatch(clearFilters())}
                        id="clear-filters-btn"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                        </svg>
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default EligibilityFilterBar;
