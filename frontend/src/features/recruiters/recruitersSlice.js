import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recruitersAPI from './recruitersAPI';

export const fetchRecruiters = createAsyncThunk(
    'recruiters/fetchRecruiters',
    async (params, { rejectWithValue }) => {
        try {
            const response = await recruitersAPI.getAll(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch recruiters' });
        }
    }
);

export const fetchRecruiterById = createAsyncThunk(
    'recruiters/fetchRecruiterById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await recruitersAPI.getById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch recruiter' });
        }
    }
);

const initialState = {
    list: [],
    selected: null,
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    loading: false,
    error: null,
};

const recruitersSlice = createSlice({
    name: 'recruiters',
    initialState,
    reducers: {
        clearRecruiterError: (state) => { state.error = null; },
        clearSelectedRecruiter: (state) => { state.selected = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecruiters.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchRecruiters.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.recruiters || [];
                state.pagination = action.payload.pagination || state.pagination;
            })
            .addCase(fetchRecruiters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(fetchRecruiterById.pending, (state) => { state.loading = true; })
            .addCase(fetchRecruiterById.fulfilled, (state, action) => {
                state.loading = false;
                state.selected = action.payload.recruiter;
            })
            .addCase(fetchRecruiterById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });
    },
});

export const { clearRecruiterError, clearSelectedRecruiter } = recruitersSlice.actions;

export const selectRecruiters = (state) => state.recruiters.list;
export const selectSelectedRecruiter = (state) => state.recruiters.selected;
export const selectRecruitersLoading = (state) => state.recruiters.loading;

export default recruitersSlice.reducer;
