import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import analyticsAPI from './analyticsAPI';

export const fetchOverviewAnalytics = createAsyncThunk(
    'analytics/fetchOverview',
    async (params, { rejectWithValue }) => {
        try {
            const response = await analyticsAPI.getOverview(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch analytics' });
        }
    }
);

export const fetchDepartmentAnalytics = createAsyncThunk(
    'analytics/fetchDepartment',
    async (params, { rejectWithValue }) => {
        try {
            const response = await analyticsAPI.getDepartment(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch department analytics' });
        }
    }
);

export const fetchYearlyAnalytics = createAsyncThunk(
    'analytics/fetchYearly',
    async (params, { rejectWithValue }) => {
        try {
            const response = await analyticsAPI.getYearly(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch yearly analytics' });
        }
    }
);

const initialState = {
    overview: null,
    department: null,
    company: null,
    yearly: null,
    loading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        clearAnalyticsError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOverviewAnalytics.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchOverviewAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.overview = action.payload;
            })
            .addCase(fetchOverviewAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(fetchDepartmentAnalytics.fulfilled, (state, action) => {
                state.department = action.payload;
            })
            .addCase(fetchYearlyAnalytics.fulfilled, (state, action) => {
                state.yearly = action.payload;
            });
    },
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export const selectOverviewAnalytics = (state) => state.analytics.overview;
export const selectDepartmentAnalytics = (state) => state.analytics.department;
export const selectYearlyAnalytics = (state) => state.analytics.yearly;
export const selectAnalyticsLoading = (state) => state.analytics.loading;

export default analyticsSlice.reducer;
