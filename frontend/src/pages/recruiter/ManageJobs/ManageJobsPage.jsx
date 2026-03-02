import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Assuming these are the Redux hooks from jobsSlice:
import { fetchJobs, selectJobs, selectJobsLoading, setJobFilters, selectJobFilters } from '../../../features/jobs/jobsSlice';

import styles from './ManageJobs.module.css';
import SummarySection from './components/SummarySection';
import JobFilterBar from './components/JobFilterBar';
import JobListingsTable from './components/JobListingsTable';
import JobTableSkeleton from './components/JobTableSkeleton';
import EmptyJobState from './components/EmptyJobState';
import Pagination from './components/Pagination';

const ManageJobsPage = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(selectJobs);
    const loading = useSelector(selectJobsLoading);
    const currentFilters = useSelector(selectJobFilters);

    // Local state for actions and selections
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

    // Initial fetch
    useEffect(() => {
        // Dispatch fetchJobs with initial queries. We mock pagination logic for demo.
        dispatch(fetchJobs({ page: pagination.page, ...currentFilters }))
            .unwrap()
            .then(res => {
                if (res.pagination) setPagination(res.pagination);
            })
            .catch(err => console.error("Failed to fetch jobs:", err));
    }, [dispatch, pagination.page, currentFilters]);

    // Derived Summary Analytics
    const summaries = useMemo(() => {
        return {
            active: jobs.filter(j => j.status === 'active').length || 0,
            applications: jobs.reduce((acc, j) => acc + (j.applicantsCount || 0), 0) || 0,
            closed: jobs.filter(j => j.status === 'closed').length || 0,
            draft: jobs.filter(j => j.status === 'draft').length || 0,
        };
    }, [jobs]);

    // Handlers
    const handleFilter = (filters) => {
        dispatch(setJobFilters(filters));
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleRowAction = (actionType, job) => {
        switch (actionType) {
            case 'view':
                // Navigate to Job details or open modal
                console.log("Viewing Job:", job.id);
                break;
            case 'edit':
                // Navigate to edit form
                console.log("Editing Job:", job.id);
                break;
            case 'close':
                // Dispatch close job thunk
                console.log("Closing Job:", job.id);
                break;
            case 'delete':
                // Dispatch delete draft thunk
                console.log("Deleting Draft:", job.id);
                break;
            default:
                break;
        }
    };

    const handleBulkClose = () => {
        console.log("Bulk Closing Jobs:", selectedJobs);
        // Dispatch bulk logic here
        setSelectedJobs([]);
    };

    const handleBulkDelete = () => {
        console.log("Bulk Deleting Drafts:", selectedJobs);
        // Dispatch bulk delete here
        setSelectedJobs([]);
    };

    // Check if any filters are currently active for empty state
    const isFilterApplied = Object.values(currentFilters).some(v => v !== '');

    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Manage Job Postings</h1>
                    <p className={styles.pageSubtitle}>Track and manage all your recruitment listings.</p>
                </div>
                <button className={styles.createBtn} onClick={() => console.log('Navigate to Create Job')}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Post New Job
                </button>
            </header>

            {/* High-Level Overview */}
            <SummarySection summaries={summaries} />

            {/* Main Content Area */}
            <div style={{ position: 'relative' }}>
                <JobFilterBar handleFilter={handleFilter} />

                {/* Bulk Actions Contextual Bar */}
                {selectedJobs.length > 0 && (
                    <div className={styles.bulkActionBar}>
                        <span className={styles.bulkText}>{selectedJobs.length} jobs selected</span>
                        <div className={styles.bulkActions}>
                            <button
                                className={`${styles.bulkBtn} ${styles.close}`}
                                onClick={handleBulkClose}
                            >
                                Close Selected
                            </button>
                            <button
                                className={`${styles.bulkBtn} ${styles.delete}`}
                                onClick={handleBulkDelete}
                            >
                                Delete Selected Drafts
                            </button>
                        </div>
                    </div>
                )}

                {/* Data Table View */}
                {loading ? (
                    <JobTableSkeleton rows={5} />
                ) : jobs.length > 0 ? (
                    <>
                        <JobListingsTable
                            jobs={jobs}
                            selectedJobs={selectedJobs}
                            setSelectedJobs={setSelectedJobs}
                            onAction={handleRowAction}
                        />
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <EmptyJobState filterApplied={isFilterApplied} />
                )}
            </div>
        </div>
    );
};

export default ManageJobsPage;
