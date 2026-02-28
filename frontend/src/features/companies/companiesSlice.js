import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import companiesAPI from './companiesAPI';

export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async (params, { rejectWithValue }) => {
        try {
            const response = await companiesAPI.getAll(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch companies' });
        }
    }
);

export const fetchCompanyById = createAsyncThunk(
    'companies/fetchCompanyById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await companiesAPI.getById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch company' });
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

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        clearCompanyError: (state) => { state.error = null; },
        clearSelectedCompany: (state) => { state.selected = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.companies || [];
                state.pagination = action.payload.pagination || state.pagination;
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(fetchCompanyById.fulfilled, (state, action) => {
                state.loading = false;
                state.selected = action.payload.company;
            });
    },
});

export const { clearCompanyError, clearSelectedCompany } = companiesSlice.actions;
export const selectCompanies = (state) => state.companies.list;
export const selectSelectedCompany = (state) => state.companies.selected;
export const selectCompaniesLoading = (state) => state.companies.loading;

export default companiesSlice.reducer;
