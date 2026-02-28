import { createSlice } from '@reduxjs/toolkit';

/**
 * UI Slice
 * Manages global UI state: sidebar, theme, modals, toasts, page metadata.
 */

/* Persist theme preference from localStorage if available */
const getInitialTheme = () => {
    try {
        const stored = localStorage.getItem('cpts_theme');
        if (stored === 'dark' || stored === 'light') return stored;
    } catch {
        /* ignore */
    }
    /* Respect system preference as fallback */
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

const initialState = {
    sidebarOpen: true,       // Mobile: drawer open/closed
    sidebarCollapsed: false, // Desktop: expanded/collapsed
    theme: getInitialTheme(),
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
        setSidebarCollapsed: (state, action) => {
            state.sidebarCollapsed = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            try {
                localStorage.setItem('cpts_theme', action.payload);
            } catch {
                /* ignore */
            }
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem('cpts_theme', state.theme);
            } catch {
                /* ignore */
            }
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
    setSidebarCollapsed,
    setTheme,
    toggleTheme,
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
