import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from './authAPI';

// ---- ASYNC THUNKS ----

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authAPI.login(credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Login failed' });
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authAPI.register(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Registration failed' });
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.getMe();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Session expired' });
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await authAPI.logout();
            return null;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Logout failed' });
        }
    }
);

// ---- INITIAL STATE ----
const initialState = {
    user: null,
    token: localStorage.getItem('cpts_auth_token') || null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// ---- SLICE ----
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user?.role || null;
            state.isAuthenticated = true;
        },
        resetAuth: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user?.role || null;
                state.isAuthenticated = true;
                localStorage.setItem('cpts_auth_token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed';
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user?.role || null;
                state.isAuthenticated = true;
                localStorage.setItem('cpts_auth_token', action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Registration failed';
            })
            // Fetch Current User
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.role = action.payload.user?.role || null;
                state.isAuthenticated = true;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.role = null;
                state.isAuthenticated = false;
                localStorage.removeItem('cpts_auth_token');
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.role = null;
                state.isAuthenticated = false;
                state.loading = false;
                localStorage.removeItem('cpts_auth_token');
            });
    },
});

export const { clearError, setCredentials, resetAuth } = authSlice.actions;

// ---- SELECTORS ----
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.role;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
