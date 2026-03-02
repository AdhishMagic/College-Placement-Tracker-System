/**
 * StudentApplications
 * Main page orchestrator for application tracking.
 * Includes Summary, Filter Bar, Grid, Pagination, and Modals.
 */
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePageMeta } from '../../../hooks';
import {
    fetchApplications,
    refreshApplications,
    selectFilteredApplications,
    selectApplicationsLoading,
    selectApplicationsRefreshing,
    selectApplicationsError,
    selectLastUpdated,
    selectAllApplications,
} from '../../../features/applications/applicationsSlice';

// Components
import {
    ApplicationSummary,
    ApplicationFilterBar,
    ApplicationCard,
    ApplicationSkeletons,
    ApplicationEmptyState,
    ApplicationPagination,
    ApplicationDetailModal,
} from '../../../components/applications';

import styles from './StudentApplications.module.css';

const StudentApplications = () => {
    usePageMeta('Application Tracking', ['Dashboard', 'Applications']);
    const dispatch = useDispatch();

    // ── Local State ──
    const [selectedApplication, setSelectedApplication] = useState(null);

    // ── Redux State ──
    const loading = useSelector(selectApplicationsLoading);
    const refreshing = useSelector(selectApplicationsRefreshing);
    const error = useSelector(selectApplicationsError);
    const allApps = useSelector(selectAllApplications);
    const { applications: filteredJobs, totalFiltered, totalPages, currentPage } = useSelector(selectFilteredApplications);
    const lastUpdated = useSelector(selectLastUpdated);

    // ── Lifecycle ──
    useEffect(() => {
        dispatch(fetchApplications());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Handlers ──
    const handleRefresh = useCallback(() => {
        dispatch(refreshApplications());
    }, [dispatch]);

    const handleViewDetails = useCallback((app) => {
        setSelectedApplication(app);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedApplication(null);
    }, []);

    // ── Format last updated ──
    const formattedLastUpdated = lastUpdated
        ? new Date(lastUpdated).toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : null;

    // ── Rendering Conditions ──
    const hasAnyApplications = allApps.length > 0;
    const hasFilteredResults = filteredJobs.length > 0;

    return (
        <div className={styles.pageContainer}>
            {/* ── Header ── */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.title}>Application Tracking</h1>
                    <p className={styles.subtitle}>
                        Monitor your hiring progress across all applied opportunities.
                    </p>
                </div>
                <div className={styles.headerRight}>
                    {formattedLastUpdated && (
                        <span className={styles.lastUpdated}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            Updated {formattedLastUpdated}
                        </span>
                    )}
                    <button
                        className={`${styles.refreshBtn} ${refreshing ? styles['refreshBtn--spinning'] : ''}`}
                        onClick={handleRefresh}
                        disabled={refreshing || loading}
                        aria-label="Refresh application status"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 4 23 10 17 10" />
                            <polyline points="1 20 1 14 7 14" />
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                        Refresh
                    </button>
                </div>
            </header>

            {/* ── Content ── */}
            {loading ? (
                <div className={styles.contentArea}>
                    <ApplicationSkeletons count={8} />
                </div>
            ) : error ? (
                <div className={styles.contentArea}>
                    <ApplicationEmptyState type="error" />
                </div>
            ) : !hasAnyApplications ? (
                <div className={styles.contentArea}>
                    <ApplicationEmptyState type="empty" />
                </div>
            ) : (
                <div className={styles.contentArea}>
                    {/* Summary Cards */}
                    <ApplicationSummary />

                    {/* Filter Bar */}
                    <div className={styles.filterSection}>
                        <ApplicationFilterBar />
                    </div>

                    {/* Results Count Summary */}
                    {hasFilteredResults && (
                        <p className={styles.resultsCount}>
                            Showing <strong>{filteredJobs.length}</strong> of <strong>{totalFiltered}</strong> applications
                        </p>
                    )}

                    {/* Applications Grid */}
                    {hasFilteredResults ? (
                        <>
                            <div className={styles.grid}>
                                {filteredJobs.map((app) => (
                                    <ApplicationCard
                                        key={app.id}
                                        application={app}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>
                            <ApplicationPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalFiltered={totalFiltered}
                            />
                        </>
                    ) : (
                        <ApplicationEmptyState type="no_results" />
                    )}
                </div>
            )}

            {/* ── Modal Overlay ── */}
            {selectedApplication && (
                <ApplicationDetailModal
                    application={selectedApplication}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default StudentApplications;
