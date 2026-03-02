/**
 * Eligibility Redux Slice
 * Manages eligibility state including eligible/not-eligible job lists,
 * filtering, sorting, pagination, and loading states.
 */
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import eligibilityAPI from './eligibilityAPI';

// ─── Async Thunks ───────────────────────────────────────────

export const fetchEligibility = createAsyncThunk(
    'eligibility/fetchEligibility',
    async (params, { rejectWithValue }) => {
        try {
            const response = await eligibilityAPI.getEligibility(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to fetch eligibility data' }
            );
        }
    }
);

export const refreshEligibility = createAsyncThunk(
    'eligibility/refreshEligibility',
    async (_, { rejectWithValue }) => {
        try {
            const response = await eligibilityAPI.refreshEligibility();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to refresh eligibility' }
            );
        }
    }
);

// ─── Initial State ──────────────────────────────────────────

const initialState = {
    // Job lists
    eligibleJobs: [],
    notEligibleJobs: [],

    // Profile completion status
    profileComplete: true,
    profileCompletionPercent: 100,
    missingProfileFields: [],

    // Filters & Sorting
    filters: {
        searchQuery: '',
        company: '',
        sortBy: 'date', // 'date' | 'package_asc' | 'package_desc'
    },

    // Pagination
    pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
    },

    // Active tab: 'eligible' | 'notEligible'
    activeTab: 'eligible',

    // Loading & Error
    loading: false,
    refreshing: false,
    error: null,

    // Timestamp of last fetch
    lastUpdated: null,
};

// ─── Slice ──────────────────────────────────────────────────

const eligibilitySlice = createSlice({
    name: 'eligibility',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
            state.pagination.page = 1; // Reset page on tab switch
        },
        setSearchQuery: (state, action) => {
            state.filters.searchQuery = action.payload;
            state.pagination.page = 1;
        },
        setCompanyFilter: (state, action) => {
            state.filters.company = action.payload;
            state.pagination.page = 1;
        },
        setSortBy: (state, action) => {
            state.filters.sortBy = action.payload;
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        clearFilters: (state) => {
            state.filters = { searchQuery: '', company: '', sortBy: 'date' };
            state.pagination.page = 1;
        },
        clearEligibilityError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ── fetchEligibility ──
            .addCase(fetchEligibility.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEligibility.fulfilled, (state, action) => {
                state.loading = false;
                state.eligibleJobs = action.payload.eligibleJobs || [];
                state.notEligibleJobs = action.payload.notEligibleJobs || [];
                state.profileComplete = action.payload.profileComplete ?? true;
                state.profileCompletionPercent = action.payload.profileCompletionPercent ?? 100;
                state.missingProfileFields = action.payload.missingProfileFields || [];
                state.pagination = {
                    ...state.pagination,
                    total: (action.payload.eligibleJobs?.length || 0) + (action.payload.notEligibleJobs?.length || 0),
                };
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchEligibility.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Something went wrong';
            })

            // ── refreshEligibility ──
            .addCase(refreshEligibility.pending, (state) => {
                state.refreshing = true;
            })
            .addCase(refreshEligibility.fulfilled, (state, action) => {
                state.refreshing = false;
                state.eligibleJobs = action.payload.eligibleJobs || [];
                state.notEligibleJobs = action.payload.notEligibleJobs || [];
                state.profileComplete = action.payload.profileComplete ?? true;
                state.profileCompletionPercent = action.payload.profileCompletionPercent ?? 100;
                state.missingProfileFields = action.payload.missingProfileFields || [];
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(refreshEligibility.rejected, (state, action) => {
                state.refreshing = false;
                state.error = action.payload?.message || 'Refresh failed';
            });
    },
});

// ─── Actions ────────────────────────────────────────────────

export const {
    setActiveTab,
    setSearchQuery,
    setCompanyFilter,
    setSortBy,
    setPage,
    clearFilters,
    clearEligibilityError,
} = eligibilitySlice.actions;

// ─── Base Selectors ─────────────────────────────────────────

export const selectEligibleJobs = (state) => state.eligibility.eligibleJobs;
export const selectNotEligibleJobs = (state) => state.eligibility.notEligibleJobs;
export const selectEligibilityLoading = (state) => state.eligibility.loading;
export const selectEligibilityRefreshing = (state) => state.eligibility.refreshing;
export const selectEligibilityError = (state) => state.eligibility.error;
export const selectActiveTab = (state) => state.eligibility.activeTab;
export const selectEligibilityFilters = (state) => state.eligibility.filters;
export const selectEligibilityPagination = (state) => state.eligibility.pagination;
export const selectProfileComplete = (state) => state.eligibility.profileComplete;
export const selectProfileCompletionPercent = (state) => state.eligibility.profileCompletionPercent;
export const selectMissingProfileFields = (state) => state.eligibility.missingProfileFields;
export const selectLastUpdated = (state) => state.eligibility.lastUpdated;

// ─── Derived / Memoized Selectors ──────────────────────────

/**
 * Returns summary counts for the eligibility dashboard.
 */
export const selectEligibilitySummary = createSelector(
    [selectEligibleJobs, selectNotEligibleJobs, selectProfileComplete, selectProfileCompletionPercent],
    (eligible, notEligible, profileComplete, completionPercent) => ({
        totalEligible: eligible.length,
        totalNotEligible: notEligible.length,
        totalJobs: eligible.length + notEligible.length,
        profileComplete,
        completionPercent,
    })
);

/**
 * Returns unique company names for the filter dropdown.
 */
export const selectUniqueCompanies = createSelector(
    [selectEligibleJobs, selectNotEligibleJobs],
    (eligible, notEligible) => {
        const all = [...eligible, ...notEligible];
        const companies = [...new Set(all.map((j) => j.companyName).filter(Boolean))];
        return companies.sort();
    }
);

/**
 * Applies search, company filter, and sorting to the active tab's job list.
 * Returns paginated results.
 */
export const selectFilteredJobs = createSelector(
    [selectEligibleJobs, selectNotEligibleJobs, selectActiveTab, selectEligibilityFilters, selectEligibilityPagination],
    (eligible, notEligible, activeTab, filters, pagination) => {
        let jobs = activeTab === 'eligible' ? [...eligible] : [...notEligible];

        // Search filter
        if (filters.searchQuery) {
            const q = filters.searchQuery.toLowerCase();
            jobs = jobs.filter(
                (j) =>
                    j.title?.toLowerCase().includes(q) ||
                    j.companyName?.toLowerCase().includes(q) ||
                    j.location?.toLowerCase().includes(q)
            );
        }

        // Company filter
        if (filters.company) {
            jobs = jobs.filter((j) => j.companyName === filters.company);
        }

        // Sorting
        switch (filters.sortBy) {
            case 'package_asc':
                jobs.sort((a, b) => (a.packageLPA || 0) - (b.packageLPA || 0));
                break;
            case 'package_desc':
                jobs.sort((a, b) => (b.packageLPA || 0) - (a.packageLPA || 0));
                break;
            case 'date':
            default:
                jobs.sort((a, b) => new Date(b.postedDate || 0) - new Date(a.postedDate || 0));
                break;
        }

        // Pagination
        const totalFiltered = jobs.length;
        const totalPages = Math.ceil(totalFiltered / pagination.limit);
        const start = (pagination.page - 1) * pagination.limit;
        const paginatedJobs = jobs.slice(start, start + pagination.limit);

        return {
            jobs: paginatedJobs,
            totalFiltered,
            totalPages,
            currentPage: pagination.page,
        };
    }
);

export default eligibilitySlice.reducer;
