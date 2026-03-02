import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import companyProfileAPI from './companyProfileAPI';

export const fetchCompanyProfile = createAsyncThunk(
    'companyProfile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await companyProfileAPI.getProfile();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to load company profile' }
            );
        }
    }
);

export const saveCompanyProfile = createAsyncThunk(
    'companyProfile/saveProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await companyProfileAPI.updateProfile(profileData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to save company profile' }
            );
        }
    }
);

export const uploadCompanyLogo = createAsyncThunk(
    'companyProfile/uploadLogo',
    async (file, { rejectWithValue }) => {
        try {
            const response = await companyProfileAPI.uploadLogo(file);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to upload logo' }
            );
        }
    }
);

const initialState = {
    data: null,
    editData: null,
    editMode: false,
    loading: false,
    saving: false,
    logoUploading: false,
    error: null,
    saveSuccess: false,
    validationErrors: {},
};

const companyProfileSlice = createSlice({
    name: 'companyProfile',
    initialState,
    reducers: {
        enterEditMode(state) {
            state.editMode = true;
            state.editData = JSON.parse(JSON.stringify(state.data)); // Deep copy
            state.validationErrors = {};
            state.saveSuccess = false;
        },
        cancelEditMode(state) {
            state.editMode = false;
            state.editData = null;
            state.validationErrors = {};
        },
        updateOverviewField(state, action) {
            const { field, value } = action.payload;
            if (state.editData && state.editData.overview) {
                state.editData.overview[field] = value;
            }
        },
        updateBasicInfoField(state, action) {
            const { field, value } = action.payload;
            if (state.editData && state.editData.basicInfo) {
                state.editData.basicInfo[field] = value;
            }
        },
        updateAboutField(state, action) {
            const { value } = action.payload;
            if (state.editData && state.editData.about) {
                state.editData.about.description = value;
            }
        },
        updateHiringPrefField(state, action) {
            const { field, value } = action.payload;
            if (state.editData && state.editData.hiringPreferences) {
                state.editData.hiringPreferences[field] = value;
            }
        },
        addPreferredSkill(state, action) {
            const skill = action.payload;
            if (state.editData && !state.editData.hiringPreferences.preferredSkills.includes(skill)) {
                state.editData.hiringPreferences.preferredSkills.push(skill);
            }
        },
        removePreferredSkill(state, action) {
            const skill = action.payload;
            if (state.editData) {
                state.editData.hiringPreferences.preferredSkills = state.editData.hiringPreferences.preferredSkills.filter(
                    s => s !== skill
                );
            }
        },
        addPreferredDepartment(state, action) {
            const dept = action.payload;
            if (state.editData && !state.editData.hiringPreferences.departments.includes(dept)) {
                state.editData.hiringPreferences.departments.push(dept);
            }
        },
        removePreferredDepartment(state, action) {
            const dept = action.payload;
            if (state.editData) {
                state.editData.hiringPreferences.departments = state.editData.hiringPreferences.departments.filter(
                    d => d !== dept
                );
            }
        },
        setValidationErrors(state, action) {
            state.validationErrors = action.payload;
        },
        clearSaveSuccess(state) {
            state.saveSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Profile
            .addCase(fetchCompanyProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.profile;
            })
            .addCase(fetchCompanyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Save Profile
            .addCase(saveCompanyProfile.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(saveCompanyProfile.fulfilled, (state, action) => {
                state.saving = false;
                state.data = action.payload.profile;
                state.editMode = false;
                state.editData = null;
                state.saveSuccess = true;
                state.validationErrors = {};
            })
            .addCase(saveCompanyProfile.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload?.message;
            })
            // Upload Logo
            .addCase(uploadCompanyLogo.pending, (state) => {
                state.logoUploading = true;
            })
            .addCase(uploadCompanyLogo.fulfilled, (state, action) => {
                state.logoUploading = false;
                if (state.editData && state.editData.overview) {
                    state.editData.overview.logoUrl = action.payload.logoUrl;
                } else if (state.data && state.data.overview) {
                    state.data.overview.logoUrl = action.payload.logoUrl;
                }
            })
            .addCase(uploadCompanyLogo.rejected, (state, action) => {
                state.logoUploading = false;
                state.error = action.payload?.message;
            });
    }
});

export const {
    enterEditMode,
    cancelEditMode,
    updateOverviewField,
    updateBasicInfoField,
    updateAboutField,
    updateHiringPrefField,
    addPreferredSkill,
    removePreferredSkill,
    addPreferredDepartment,
    removePreferredDepartment,
    setValidationErrors,
    clearSaveSuccess,
} = companyProfileSlice.actions;

export const selectCompanyData = (state) => state.companyProfile.data;
export const selectCompanyEditData = (state) => state.companyProfile.editData;
export const selectCompanyEditMode = (state) => state.companyProfile.editMode;
export const selectCompanyLoading = (state) => state.companyProfile.loading;
export const selectCompanySaving = (state) => state.companyProfile.saving;
export const selectCompanyError = (state) => state.companyProfile.error;
export const selectCompanySaveSuccess = (state) => state.companyProfile.saveSuccess;
export const selectCompanyValidationErrors = (state) => state.companyProfile.validationErrors;
export const selectCompanyLogoUploading = (state) => state.companyProfile.logoUploading;

export default companyProfileSlice.reducer;
