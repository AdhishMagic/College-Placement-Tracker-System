import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import placementsAPI from './placementsAPI';

export const fetchPlacements = createAsyncThunk(
    'placements/fetchPlacements',
    async (params, { rejectWithValue }) => {
        try {
            const response = await placementsAPI.getAll(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch placements' });
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

const placementsSlice = createSlice({
    name: 'placements',
    initialState,
    reducers: {
        clearPlacementError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlacements.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchPlacements.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.placements || [];
                state.pagination = action.payload.pagination || state.pagination;
            })
            .addCase(fetchPlacements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });
    },
});

export const { clearPlacementError } = placementsSlice.actions;
export const selectPlacements = (state) => state.placements.list;
export const selectPlacementsLoading = (state) => state.placements.loading;

export default placementsSlice.reducer;
