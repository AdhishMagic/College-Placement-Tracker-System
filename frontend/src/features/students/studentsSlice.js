import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import studentsAPI from './studentsAPI';

// ---- ASYNC THUNKS ----

export const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async (params, { rejectWithValue }) => {
        try {
            const response = await studentsAPI.getAll(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch students' });
        }
    }
);

export const fetchStudentById = createAsyncThunk(
    'students/fetchStudentById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await studentsAPI.getById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch student' });
        }
    }
);

export const updateStudent = createAsyncThunk(
    'students/updateStudent',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await studentsAPI.update(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Update failed' });
        }
    }
);

// ---- INITIAL STATE ----
const initialState = {
    list: [],
    selected: null,
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    filters: {},
    loading: false,
    error: null,
};

// ---- SLICE ----
const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        clearStudentError: (state) => { state.error = null; },
        setStudentFilters: (state, action) => { state.filters = action.payload; },
        clearSelectedStudent: (state) => { state.selected = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.students || [];
                state.pagination = action.payload.pagination || state.pagination;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(fetchStudentById.pending, (state) => { state.loading = true; })
            .addCase(fetchStudentById.fulfilled, (state, action) => {
                state.loading = false;
                state.selected = action.payload.student;
            })
            .addCase(fetchStudentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.selected = action.payload.student;
                const idx = state.list.findIndex((s) => s.id === action.payload.student.id);
                if (idx !== -1) state.list[idx] = action.payload.student;
            });
    },
});

export const { clearStudentError, setStudentFilters, clearSelectedStudent } = studentsSlice.actions;

// ---- SELECTORS ----
export const selectStudents = (state) => state.students.list;
export const selectSelectedStudent = (state) => state.students.selected;
export const selectStudentsPagination = (state) => state.students.pagination;
export const selectStudentsLoading = (state) => state.students.loading;
export const selectStudentsError = (state) => state.students.error;

export default studentsSlice.reducer;
