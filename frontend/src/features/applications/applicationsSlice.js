/**
 * Applications Slice
 * Redux state management for student application tracking.
 *
 * State shape:
 *   applications[]       – all fetched application records
 *   selectedApplication   – currently viewed detail
 *   filters               – active filter/search/sort/pagination
 *   loading / refreshing / detailLoading
 *   error
 */
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import applicationsAPI from './applicationsAPI';

/* ── Constants ── */
const PAGE_SIZE = 8;

export const APPLICATION_STATUSES = {
    APPLIED: 'applied',
    SHORTLISTED: 'shortlisted',
    INTERVIEW_SCHEDULED: 'interview_scheduled',
    OFFER_RECEIVED: 'offer_received',
    REJECTED: 'rejected',
};

export const HIRING_STAGES = [
    { key: 'applied', label: 'Applied', icon: 'send' },
    { key: 'shortlisted', label: 'Shortlisted', icon: 'check-circle' },
    { key: 'interview_r1', label: 'Interview Round 1', icon: 'users' },
    { key: 'interview_r2', label: 'Interview Round 2', icon: 'user-check' },
    { key: 'offer', label: 'Offer', icon: 'award' },
];

const STATUS_LABEL_MAP = {
    [APPLICATION_STATUSES.APPLIED]: 'Applied',
    [APPLICATION_STATUSES.SHORTLISTED]: 'Shortlisted',
    [APPLICATION_STATUSES.INTERVIEW_SCHEDULED]: 'Interview Scheduled',
    [APPLICATION_STATUSES.OFFER_RECEIVED]: 'Offer Received',
    [APPLICATION_STATUSES.REJECTED]: 'Rejected',
};

/* ── Mock Data for presentation ── */
const MOCK_APPLICATIONS = [
    {
        id: '1',
        companyName: 'TechNova Solutions',
        companyLogo: 'https://via.placeholder.com/44x44/2166B3/FFFFFF?text=TN',
        jobTitle: 'Frontend Engineer',
        package: '12 LPA',
        appliedDate: '2026-02-15T10:00:00Z',
        status: APPLICATION_STATUSES.OFFER_RECEIVED,
        currentStage: 'offer',
        completedStages: {
            applied: '2026-02-15T10:00:00Z',
            shortlisted: '2026-02-18T14:30:00Z',
            interview_r1: '2026-02-22T09:00:00Z',
            interview_r2: '2026-02-25T11:00:00Z',
            offer: '2026-03-01T16:00:00Z'
        },
        location: 'Bangalore',
        jobType: 'Full-time',
        jobDescription: 'Join our core engineering team to build scalable web applications using React and Node.js.',
        offerDetails: {
            ctc: '12,00,000 INR',
            joiningDate: '15th July 2026',
            role: 'SDE-I (Frontend)',
            location: 'Bangalore Office'
        }
    },
    {
        id: '2',
        companyName: 'Apex Financial',
        companyLogo: '',
        jobTitle: 'Software Developer',
        package: '15 LPA',
        appliedDate: '2026-02-20T10:00:00Z',
        status: APPLICATION_STATUSES.INTERVIEW_SCHEDULED,
        currentStage: 'interview_r1',
        completedStages: {
            applied: '2026-02-20T10:00:00Z',
            shortlisted: '2026-02-24T14:30:00Z',
        },
        location: 'Mumbai',
        jobType: 'Full-time',
        interviewSchedule: [
            { round: 1, type: 'Technical (DSA)', dateTime: '2026-03-05T10:30:00Z', link: 'https://meet.google.com/abc-defg-hij' }
        ]
    },
    {
        id: '3',
        companyName: 'Creative Media',
        companyLogo: '',
        jobTitle: 'UI/UX Designer',
        package: '8 LPA',
        appliedDate: '2026-02-28T10:00:00Z',
        status: APPLICATION_STATUSES.SHORTLISTED,
        currentStage: 'shortlisted',
        completedStages: {
            applied: '2026-02-28T10:00:00Z',
            shortlisted: '2026-03-02T09:00:00Z',
        },
        location: 'Remote',
        jobType: 'Full-time',
    },
    {
        id: '4',
        companyName: 'Global Enterprises',
        companyLogo: '',
        jobTitle: 'Backend Engineer',
        package: '10 LPA',
        appliedDate: '2026-01-10T10:00:00Z',
        status: APPLICATION_STATUSES.REJECTED,
        currentStage: 'shortlisted', // It was shortlisted then rejected
        completedStages: {
            applied: '2026-01-10T10:00:00Z',
            shortlisted: '2026-01-15T14:30:00Z',
        },
        location: 'Pune',
        jobType: 'Full-time',
    }
];

/* ── Async Thunks ── */
export const fetchApplications = createAsyncThunk(
    'applications/fetchApplications',
    async (_, { rejectWithValue }) => {
        try {
            // Mock API delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            return MOCK_APPLICATIONS;
        } catch (err) {
            return rejectWithValue('Failed to load applications.');
        }
    },
);

export const fetchApplicationDetail = createAsyncThunk(
    'applications/fetchApplicationDetail',
    async (applicationId, { rejectWithValue }) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 400));
            const detail = MOCK_APPLICATIONS.find(a => a.id === applicationId);
            return detail || rejectWithValue('Application not found');
        } catch (err) {
            return rejectWithValue('Failed to load application details.');
        }
    },
);

export const refreshApplications = createAsyncThunk(
    'applications/refreshApplications',
    async (_, { rejectWithValue }) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            return MOCK_APPLICATIONS;
        } catch (err) {
            return rejectWithValue('Failed to refresh applications.');
        }
    },
);

/* ── Initial State ── */
const initialState = {
    applications: [],
    selectedApplication: null,
    filters: {
        searchQuery: '',
        statusFilter: 'all',
        sortBy: 'latest', // 'latest' | 'oldest' | 'company_asc' | 'company_desc'
        currentPage: 1,
        pageSize: PAGE_SIZE,
    },
    loading: false,
    refreshing: false,
    detailLoading: false,
    error: null,
    lastUpdated: null,
};

/* ── Slice ── */
const applicationsSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.filters.searchQuery = action.payload;
            state.filters.currentPage = 1;
        },
        setStatusFilter(state, action) {
            state.filters.statusFilter = action.payload;
            state.filters.currentPage = 1;
        },
        setSortBy(state, action) {
            state.filters.sortBy = action.payload;
            state.filters.currentPage = 1;
        },
        setCurrentPage(state, action) {
            state.filters.currentPage = action.payload;
        },
        setSelectedApplication(state, action) {
            state.selectedApplication = action.payload;
        },
        clearSelectedApplication(state) {
            state.selectedApplication = null;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ── fetchApplications ── */
            .addCase(fetchApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload.applications || action.payload || [];
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            /* ── refreshApplications ── */
            .addCase(refreshApplications.pending, (state) => {
                state.refreshing = true;
            })
            .addCase(refreshApplications.fulfilled, (state, action) => {
                state.refreshing = false;
                state.applications = action.payload.applications || action.payload || [];
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(refreshApplications.rejected, (state, action) => {
                state.refreshing = false;
                state.error = action.payload;
            })
            /* ── fetchApplicationDetail ── */
            .addCase(fetchApplicationDetail.pending, (state) => {
                state.detailLoading = true;
            })
            .addCase(fetchApplicationDetail.fulfilled, (state, action) => {
                state.detailLoading = false;
                state.selectedApplication = action.payload;
            })
            .addCase(fetchApplicationDetail.rejected, (state, action) => {
                state.detailLoading = false;
                state.error = action.payload;
            });
    },
});

/* ── Actions ── */
export const {
    setSearchQuery,
    setStatusFilter,
    setSortBy,
    setCurrentPage,
    setSelectedApplication,
    clearSelectedApplication,
    clearError,
} = applicationsSlice.actions;

/* ── Simple Selectors ── */
export const selectApplicationsLoading = (state) => state.applications.loading;
export const selectApplicationsRefreshing = (state) => state.applications.refreshing;
export const selectApplicationsError = (state) => state.applications.error;
export const selectDetailLoading = (state) => state.applications.detailLoading;
export const selectSelectedApplication = (state) => state.applications.selectedApplication;
export const selectLastUpdated = (state) => state.applications.lastUpdated;
export const selectFilters = (state) => state.applications.filters;
export const selectAllApplications = (state) => state.applications.applications;

/* ── Memoized Selectors ── */

/** Summary KPI counts */
export const selectApplicationSummary = createSelector(
    [selectAllApplications],
    (applications) => {
        const total = applications.length;
        const shortlisted = applications.filter(
            (a) => a.status === APPLICATION_STATUSES.SHORTLISTED ||
                a.status === APPLICATION_STATUSES.INTERVIEW_SCHEDULED ||
                a.status === APPLICATION_STATUSES.OFFER_RECEIVED,
        ).length;
        const interviews = applications.filter(
            (a) => a.status === APPLICATION_STATUSES.INTERVIEW_SCHEDULED,
        ).length;
        const offers = applications.filter(
            (a) => a.status === APPLICATION_STATUSES.OFFER_RECEIVED,
        ).length;
        return { total, shortlisted, interviews, offers };
    },
);

/** Filtered, sorted, paginated list */
export const selectFilteredApplications = createSelector(
    [selectAllApplications, selectFilters],
    (applications, filters) => {
        const { searchQuery, statusFilter, sortBy, currentPage, pageSize } = filters;

        // 1. Search
        let result = applications;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (a) =>
                    a.companyName?.toLowerCase().includes(q) ||
                    a.jobTitle?.toLowerCase().includes(q),
            );
        }

        // 2. Status filter
        if (statusFilter !== 'all') {
            result = result.filter((a) => a.status === statusFilter);
        }

        // 3. Sort
        const sorted = [...result];
        switch (sortBy) {
            case 'latest':
                sorted.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
                break;
            case 'oldest':
                sorted.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
                break;
            case 'company_asc':
                sorted.sort((a, b) => (a.companyName || '').localeCompare(b.companyName || ''));
                break;
            case 'company_desc':
                sorted.sort((a, b) => (b.companyName || '').localeCompare(a.companyName || ''));
                break;
            default:
                break;
        }

        // 4. Paginate
        const totalFiltered = sorted.length;
        const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
        const safePage = Math.min(currentPage, totalPages);
        const start = (safePage - 1) * pageSize;
        const paged = sorted.slice(start, start + pageSize);

        return {
            applications: paged,
            totalFiltered,
            totalPages,
            currentPage: safePage,
        };
    },
);

/* ── Helpers ── */
export { STATUS_LABEL_MAP };

export default applicationsSlice.reducer;
