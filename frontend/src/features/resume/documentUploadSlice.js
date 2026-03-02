import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ---- CONSTANTS ----
const ACCEPTED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// ---- ASYNC THUNKS ----

/**
 * uploadDocument
 * Simulates a file upload with progress tracking.
 */
export const uploadDocument = createAsyncThunk(
    'documentUpload/upload',
    async (file, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startUpload());

            // Simulate upload progress
            for (let i = 0; i <= 100; i += 10) {
                await new Promise((r) => setTimeout(r, 200));
                dispatch(updateProgress(i));
            }

            // Simulated success response
            return {
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file),
                uploadedAt: new Date().toISOString(),
            };
        } catch (error) {
            return rejectWithValue(error.message || 'Upload failed. Please try again.');
        }
    }
);

/**
 * deleteDocument
 * Simulates deleting a document from the server.
 */
export const deleteDocument = createAsyncThunk(
    'documentUpload/delete',
    async (_, { rejectWithValue }) => {
        try {
            await new Promise((r) => setTimeout(r, 600));
            return true;
        } catch (error) {
            return rejectWithValue(error.message || 'Delete failed.');
        }
    }
);

// ---- INITIAL STATE ----
const initialState = {
    file: null,             // Selected file metadata { name, size, type }
    uploadStatus: 'idle',   // 'idle' | 'uploading' | 'uploaded' | 'failed'
    progress: 0,            // 0–100
    error: null,
    uploadedFile: null,     // { name, size, type, url, uploadedAt }
    deleteModalOpen: false,
};

// ---- SLICE ----
const documentUploadSlice = createSlice({
    name: 'documentUpload',
    initialState,
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload;
            state.error = null;
        },
        clearFile: (state) => {
            state.file = null;
            state.uploadStatus = 'idle';
            state.progress = 0;
            state.error = null;
            state.uploadedFile = null;
        },
        startUpload: (state) => {
            state.uploadStatus = 'uploading';
            state.progress = 0;
            state.error = null;
        },
        updateProgress: (state, action) => {
            state.progress = action.payload;
        },
        uploadSuccess: (state, action) => {
            state.uploadStatus = 'uploaded';
            state.progress = 100;
            state.uploadedFile = action.payload;
            state.file = null;
        },
        uploadFailure: (state, action) => {
            state.uploadStatus = 'failed';
            state.error = action.payload;
            state.progress = 0;
        },
        openDeleteModal: (state) => {
            state.deleteModalOpen = true;
        },
        closeDeleteModal: (state) => {
            state.deleteModalOpen = false;
        },
        clearUploadError: (state) => {
            state.error = null;
            if (state.uploadStatus === 'failed') {
                state.uploadStatus = 'idle';
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Upload
            .addCase(uploadDocument.fulfilled, (state, action) => {
                state.uploadStatus = 'uploaded';
                state.progress = 100;
                state.uploadedFile = action.payload;
                state.file = null;
            })
            .addCase(uploadDocument.rejected, (state, action) => {
                state.uploadStatus = 'failed';
                state.error = action.payload || 'Upload failed';
                state.progress = 0;
            })
            // Delete
            .addCase(deleteDocument.pending, (state) => {
                state.deleteModalOpen = false;
            })
            .addCase(deleteDocument.fulfilled, (state) => {
                state.file = null;
                state.uploadStatus = 'idle';
                state.progress = 0;
                state.error = null;
                state.uploadedFile = null;
            })
            .addCase(deleteDocument.rejected, (state, action) => {
                state.error = action.payload || 'Delete failed';
            });
    },
});

export const {
    setFile,
    clearFile,
    startUpload,
    updateProgress,
    uploadSuccess,
    uploadFailure,
    openDeleteModal,
    closeDeleteModal,
    clearUploadError,
} = documentUploadSlice.actions;

// ---- SELECTORS ----
export const selectUploadStatus = (state) => state.documentUpload.uploadStatus;
export const selectUploadProgress = (state) => state.documentUpload.progress;
export const selectUploadedFile = (state) => state.documentUpload.uploadedFile;
export const selectUploadError = (state) => state.documentUpload.error;
export const selectDeleteModalOpen = (state) => state.documentUpload.deleteModalOpen;
export const selectSelectedFile = (state) => state.documentUpload.file;

// ---- HELPERS (exported for component use) ----
export const UPLOAD_ACCEPTED_TYPES = ACCEPTED_TYPES;
export const UPLOAD_MAX_SIZE = MAX_FILE_SIZE;

export default documentUploadSlice.reducer;
