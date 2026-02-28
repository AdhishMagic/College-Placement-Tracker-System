import { createSlice } from '@reduxjs/toolkit';

/**
 * UI Slice
 * Manages global UI state: sidebar, theme, modals, toasts.
 */
const initialState = {
    sidebarOpen: true,
    sidebarCollapsed: false,
    theme: 'light', // 'light' | 'dark'
    activeModal: null,
    modalData: null,
    toasts: [],
    pageTitle: '',
    breadcrumbs: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        toggleSidebarCollapse: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        openModal: (state, action) => {
            state.activeModal = action.payload.modal;
            state.modalData = action.payload.data || null;
        },
        closeModal: (state) => {
            state.activeModal = null;
            state.modalData = null;
        },
        addToast: (state, action) => {
            state.toasts.push({
                id: Date.now(),
                type: action.payload.type || 'info', // 'success' | 'error' | 'warning' | 'info'
                message: action.payload.message,
                duration: action.payload.duration || 5000,
            });
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter((t) => t.id !== action.payload);
        },
        setPageTitle: (state, action) => {
            state.pageTitle = action.payload;
        },
        setBreadcrumbs: (state, action) => {
            state.breadcrumbs = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    setSidebarOpen,
    toggleSidebarCollapse,
    setTheme,
    openModal,
    closeModal,
    addToast,
    removeToast,
    setPageTitle,
    setBreadcrumbs,
} = uiSlice.actions;

// ---- SELECTORS ----
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
export const selectTheme = (state) => state.ui.theme;
export const selectActiveModal = (state) => state.ui.activeModal;
export const selectModalData = (state) => state.ui.modalData;
export const selectToasts = (state) => state.ui.toasts;
export const selectPageTitle = (state) => state.ui.pageTitle;
export const selectBreadcrumbs = (state) => state.ui.breadcrumbs;

export default uiSlice.reducer;
