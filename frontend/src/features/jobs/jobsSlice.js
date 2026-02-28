import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobsAPI from './jobsAPI';

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (params, { rejectWithValue }) => {
        try {
            const response = await jobsAPI.getAll(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch jobs' });
        }
    }
);

export const fetchJobById = createAsyncThunk(
    'jobs/fetchJobById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await jobsAPI.getById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch job' });
        }
    }
);

export const createJob = createAsyncThunk(
    'jobs/createJob',
    async (jobData, { rejectWithValue }) => {
        try {
            const response = await jobsAPI.create(jobData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to create job' });
        }
    }
);

export const applyToJob = createAsyncThunk(
    'jobs/applyToJob',
    async ({ jobId, applicationData }, { rejectWithValue }) => {
        try {
            const response = await jobsAPI.apply(jobId, applicationData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Application failed' });
        }
    }
);

const initialState = {
    list: [],
    selected: null,
    applicants: [],
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    filters: { status: '', company: '', department: '' },
    loading: false,
    error: null,
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        clearJobError: (state) => { state.error = null; },
        setJobFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; },
        clearSelectedJob: (state) => { state.selected = null; state.applicants = []; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.jobs || [];
                state.pagination = action.payload.pagination || state.pagination;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.selected = action.payload.job;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.list.unshift(action.payload.job);
            })
            .addCase(applyToJob.fulfilled, (state) => {
                // Optionally update the selected job's applicant count
                if (state.selected) {
                    state.selected.applicantCount = (state.selected.applicantCount || 0) + 1;
                }
            });
    },
});

export const { clearJobError, setJobFilters, clearSelectedJob } = jobsSlice.actions;

export const selectJobs = (state) => state.jobs.list;
export const selectSelectedJob = (state) => state.jobs.selected;
export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobFilters = (state) => state.jobs.filters;

export default jobsSlice.reducer;
