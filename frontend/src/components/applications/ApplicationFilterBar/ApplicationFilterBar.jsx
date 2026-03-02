/**
 * ApplicationFilterBar
 * Search by company/job, filter by status, sort by order.
 */
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectFilters,
    setSearchQuery,
    setStatusFilter,
    setSortBy,
    APPLICATION_STATUSES,
} from '../../../features/applications/applicationsSlice';
import './ApplicationFilterBar.css';

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const FilterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const SortIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
    </svg>
);

const STATUS_OPTIONS = [
    { value: 'all', label: 'All Statuses' },
    { value: APPLICATION_STATUSES.APPLIED, label: 'Applied' },
    { value: APPLICATION_STATUSES.SHORTLISTED, label: 'Shortlisted' },
    { value: APPLICATION_STATUSES.INTERVIEW_SCHEDULED, label: 'Interview Scheduled' },
    { value: APPLICATION_STATUSES.OFFER_RECEIVED, label: 'Offer Received' },
    { value: APPLICATION_STATUSES.REJECTED, label: 'Rejected' },
];

const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'company_asc', label: 'Company A–Z' },
    { value: 'company_desc', label: 'Company Z–A' },
];

const ApplicationFilterBar = () => {
    const dispatch = useDispatch();
    const { searchQuery, statusFilter, sortBy } = useSelector(selectFilters);

    const handleSearch = useCallback(
        (e) => dispatch(setSearchQuery(e.target.value)),
        [dispatch],
    );

    const handleStatus = useCallback(
        (e) => dispatch(setStatusFilter(e.target.value)),
        [dispatch],
    );

    const handleSort = useCallback(
        (e) => dispatch(setSortBy(e.target.value)),
        [dispatch],
    );

    return (
        <div className="app-filter-bar" role="search" aria-label="Filter applications">
            {/* ── Search ── */}
            <div className="app-filter-bar__search">
                <span className="app-filter-bar__search-icon"><SearchIcon /></span>
                <input
                    id="application-search-input"
                    type="text"
                    className="app-filter-bar__search-input"
                    placeholder="Search company or job title…"
                    value={searchQuery}
                    onChange={handleSearch}
                    aria-label="Search applications"
                />
                {searchQuery && (
                    <button
                        className="app-filter-bar__search-clear"
                        onClick={() => dispatch(setSearchQuery(''))}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* ── Status Filter ── */}
            <div className="app-filter-bar__select-wrap">
                <span className="app-filter-bar__select-icon"><FilterIcon /></span>
                <select
                    id="application-status-filter"
                    className="app-filter-bar__select"
                    value={statusFilter}
                    onChange={handleStatus}
                    aria-label="Filter by status"
                >
                    {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* ── Sort ── */}
            <div className="app-filter-bar__select-wrap">
                <span className="app-filter-bar__select-icon"><SortIcon /></span>
                <select
                    id="application-sort-select"
                    className="app-filter-bar__select"
                    value={sortBy}
                    onChange={handleSort}
                    aria-label="Sort applications"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ApplicationFilterBar;
