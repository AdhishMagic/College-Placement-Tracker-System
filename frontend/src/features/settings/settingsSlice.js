import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock initial data
const initialState = {
    data: {
        general: { platformName: 'Edway Placement', contactEmail: 'admin@college.edu', currency: 'INR' },
        rules: { minCgpa: 6.5, backlogLimit: 0, autoCloseJobs: true, applicationDeadlinePolicy: true },
        notifications: { email: true, system: true, reminders: true },
        security: { passwordPolicy: true, sessionTimeout: 30, twoFactorAuth: false },
        academicYear: { currentYear: '2026-2027', cycleStatus: 'Open' },
        roles: {
            admin: ['Manage Users', 'System Config', 'Approve Jobs', 'View Analytics'],
            recruiter: ['Post Jobs', 'Shortlist Candidates', 'Schedule Interviews'],
            student: ['View Jobs', 'Apply', 'Upload Resume'],
        }
    },
    drafts: null,
    isLoading: false,
    isSaving: false,
    error: null,
    successMessage: null
};

// Mock async thunks
export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (_, { rejectWithValue }) => {
        try {
            // Simulate API logic
            await new Promise(resolve => setTimeout(resolve, 800));
            return initialState.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const saveSettings = createAsyncThunk(
    'settings/saveSettings',
    async (settingsData, { rejectWithValue }) => {
        try {
            // Simulate API save logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            return settingsData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateDraft: (state, action) => {
            const { section, field, value } = action.payload;
            if (!state.drafts) {
                state.drafts = JSON.parse(JSON.stringify(state.data));
            }
            if (section && state.drafts[section]) {
                state.drafts[section][field] = value;
            }
        },
        resetDrafts: (state) => {
            state.drafts = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch settings
            .addCase(fetchSettings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch settings';
            })
            // Save settings
            .addCase(saveSettings.pending, (state) => {
                state.isSaving = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(saveSettings.fulfilled, (state, action) => {
                state.isSaving = false;
                state.data = action.payload;
                state.drafts = null;
                state.successMessage = 'Settings updated successfully';
            })
            .addCase(saveSettings.rejected, (state, action) => {
                state.isSaving = false;
                state.error = action.payload || 'Failed to save settings';
            });
    }
});

export const { updateDraft, resetDrafts, clearSuccessMessage } = settingsSlice.actions;

export const selectSettingsData = (state) => state.settings.drafts || state.settings.data;
export const selectOriginalSettings = (state) => state.settings.data;
export const selectSettingsLoading = (state) => state.settings.isLoading;
export const selectSettingsSaving = (state) => state.settings.isSaving;
export const selectSettingsError = (state) => state.settings.error;
export const selectSettingsSuccess = (state) => state.settings.successMessage;
export const selectHasDraftChanges = (state) => state.settings.drafts !== null;

export default settingsSlice.reducer;
