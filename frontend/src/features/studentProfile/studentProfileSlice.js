import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ---- ASYNC THUNKS ----

export const fetchStudentProfile = createAsyncThunk(
    'studentProfile/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            // Simulated API call — will be replaced with real endpoint
            await new Promise((r) => setTimeout(r, 800));
            return {
                personal: {
                    fullName: 'Alex Johnson',
                    email: 'alex.johnson@university.edu',
                    phone: '+91 98765 43210',
                    address: '42 Oak Street, Cambridge, MA 02139',
                    dateOfBirth: '2003-05-15',
                    avatarUrl: null,
                },
                academic: {
                    university: 'Massachusetts Institute of Technology',
                    degree: 'B.Tech',
                    department: 'Computer Science & Engineering',
                    cgpa: 8.72,
                    backlogCount: 0,
                    graduationYear: 2026,
                },
                skills: {
                    technical: ['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Docker'],
                    soft: ['Leadership', 'Communication', 'Problem Solving'],
                },
                projects: [
                    {
                        id: 'p1',
                        title: 'AI Resume Builder',
                        description: 'An intelligent resume builder that uses Gemini API to generate ATS-optimized resumes with real-time scoring.',
                        technologies: ['React', 'Node.js', 'Gemini API'],
                        githubLink: 'https://github.com/alexjohnson/ai-resume-builder',
                        portfolioLink: '',
                    },
                    {
                        id: 'p2',
                        title: 'E-Commerce Microservices',
                        description: 'Scalable e-commerce platform built with microservices architecture using Docker and Kubernetes.',
                        technologies: ['Python', 'FastAPI', 'Docker', 'Kubernetes'],
                        githubLink: 'https://github.com/alexjohnson/ecommerce-ms',
                        portfolioLink: 'https://ecommerce-demo.com',
                    },
                ],
                certifications: [
                    {
                        id: 'c1',
                        title: 'AWS Solutions Architect Associate',
                        issuer: 'Amazon Web Services',
                        date: '2025-08',
                        credentialUrl: 'https://aws.amazon.com/verify/cert123',
                    },
                    {
                        id: 'c2',
                        title: 'Google Professional Cloud Developer',
                        issuer: 'Google Cloud',
                        date: '2025-06',
                        credentialUrl: '',
                    },
                ],
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch profile' });
        }
    }
);

export const saveStudentProfile = createAsyncThunk(
    'studentProfile/saveProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            // Simulated save — will be replaced with real endpoint
            await new Promise((r) => setTimeout(r, 1000));
            return profileData;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Save failed' });
        }
    }
);

// ---- INITIAL STATE ----
const initialState = {
    data: {
        personal: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            dateOfBirth: '',
            avatarUrl: null,
        },
        academic: {
            university: '',
            degree: '',
            department: '',
            cgpa: 0,
            backlogCount: 0,
            graduationYear: new Date().getFullYear(),
        },
        skills: {
            technical: [],
            soft: [],
        },
        projects: [],
        certifications: [],
    },
    editMode: false,
    editData: null, // Clone of data during editing
    loading: false,
    saving: false,
    error: null,
    saveSuccess: false,
    validationErrors: {},
};

// ---- SLICE ----
const studentProfileSlice = createSlice({
    name: 'studentProfile',
    initialState,
    reducers: {
        // Toggle edit mode
        enterEditMode: (state) => {
            state.editMode = true;
            state.editData = JSON.parse(JSON.stringify(state.data));
            state.validationErrors = {};
            state.saveSuccess = false;
        },
        cancelEditMode: (state) => {
            state.editMode = false;
            state.editData = null;
            state.validationErrors = {};
        },

        // Update edit data fields
        updatePersonalField: (state, action) => {
            const { field, value } = action.payload;
            if (state.editData) {
                state.editData.personal[field] = value;
            }
        },
        updateAcademicField: (state, action) => {
            const { field, value } = action.payload;
            if (state.editData) {
                state.editData.academic[field] = value;
            }
        },

        // Skills management
        addSkill: (state, action) => {
            const { category, skill } = action.payload;
            if (state.editData && !state.editData.skills[category].includes(skill)) {
                state.editData.skills[category].push(skill);
            }
        },
        removeSkill: (state, action) => {
            const { category, skill } = action.payload;
            if (state.editData) {
                state.editData.skills[category] = state.editData.skills[category].filter((s) => s !== skill);
            }
        },

        // Projects management
        addProject: (state, action) => {
            if (state.editData) {
                state.editData.projects.push({
                    id: `p${Date.now()}`,
                    title: '',
                    description: '',
                    technologies: [],
                    githubLink: '',
                    portfolioLink: '',
                    ...action.payload,
                });
            }
        },
        updateProject: (state, action) => {
            const { id, field, value } = action.payload;
            if (state.editData) {
                const project = state.editData.projects.find((p) => p.id === id);
                if (project) project[field] = value;
            }
        },
        removeProject: (state, action) => {
            if (state.editData) {
                state.editData.projects = state.editData.projects.filter((p) => p.id !== action.payload);
            }
        },
        addProjectTech: (state, action) => {
            const { id, tech } = action.payload;
            if (state.editData) {
                const project = state.editData.projects.find((p) => p.id === id);
                if (project && !project.technologies.includes(tech)) {
                    project.technologies.push(tech);
                }
            }
        },
        removeProjectTech: (state, action) => {
            const { id, tech } = action.payload;
            if (state.editData) {
                const project = state.editData.projects.find((p) => p.id === id);
                if (project) {
                    project.technologies = project.technologies.filter((t) => t !== tech);
                }
            }
        },

        // Certifications management
        addCertification: (state, action) => {
            if (state.editData) {
                state.editData.certifications.push({
                    id: `c${Date.now()}`,
                    title: '',
                    issuer: '',
                    date: '',
                    credentialUrl: '',
                    ...action.payload,
                });
            }
        },
        updateCertification: (state, action) => {
            const { id, field, value } = action.payload;
            if (state.editData) {
                const cert = state.editData.certifications.find((c) => c.id === id);
                if (cert) cert[field] = value;
            }
        },
        removeCertification: (state, action) => {
            if (state.editData) {
                state.editData.certifications = state.editData.certifications.filter((c) => c.id !== action.payload);
            }
        },

        // Validation
        setValidationErrors: (state, action) => {
            state.validationErrors = action.payload;
        },
        clearValidationError: (state, action) => {
            delete state.validationErrors[action.payload];
        },
        clearSaveSuccess: (state) => {
            state.saveSuccess = false;
        },
        clearProfileError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchStudentProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchStudentProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to load profile';
            })
            // Save
            .addCase(saveStudentProfile.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(saveStudentProfile.fulfilled, (state, action) => {
                state.saving = false;
                state.data = action.payload;
                state.editMode = false;
                state.editData = null;
                state.saveSuccess = true;
                state.validationErrors = {};
            })
            .addCase(saveStudentProfile.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload?.message || 'Save failed';
            });
    },
});

export const {
    enterEditMode,
    cancelEditMode,
    updatePersonalField,
    updateAcademicField,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addProjectTech,
    removeProjectTech,
    addCertification,
    updateCertification,
    removeCertification,
    setValidationErrors,
    clearValidationError,
    clearSaveSuccess,
    clearProfileError,
} = studentProfileSlice.actions;

// ---- SELECTORS ----
export const selectProfileData = (state) => state.studentProfile.data;
export const selectEditData = (state) => state.studentProfile.editData;
export const selectEditMode = (state) => state.studentProfile.editMode;
export const selectProfileLoading = (state) => state.studentProfile.loading;
export const selectProfileSaving = (state) => state.studentProfile.saving;
export const selectProfileError = (state) => state.studentProfile.error;
export const selectSaveSuccess = (state) => state.studentProfile.saveSuccess;
export const selectValidationErrors = (state) => state.studentProfile.validationErrors;

export default studentProfileSlice.reducer;
