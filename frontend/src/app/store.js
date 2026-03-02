import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import studentsReducer from '../features/students/studentsSlice';
import recruitersReducer from '../features/recruiters/recruitersSlice';
import jobsReducer from '../features/jobs/jobsSlice';
import companiesReducer from '../features/companies/companiesSlice';
import placementsReducer from '../features/placements/placementsSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import uiReducer from '../features/ui/uiSlice';
import studentProfileReducer from '../features/studentProfile/studentProfileSlice';
import documentUploadReducer from '../features/resume/documentUploadSlice';

/**
 * Redux Store Configuration
 *
 * Feature-based slice architecture:
 *  - auth             → login/logout state, current user, token
 *  - students         → student list, profile, CRUD
 *  - studentProfile   → individual student profile management (edit/view)
 *  - recruiters       → recruiter list, profile, CRUD
 *  - jobs             → job/drive listings, details
 *  - companies        → company directory
 *  - placements       → placement records
 *  - analytics        → dashboard analytics data
 *  - notifications    → in-app notifications
 *  - ui               → sidebar state, theme, modals, toasts
 */
const store = configureStore({
    reducer: {
        auth: authReducer,
        students: studentsReducer,
        studentProfile: studentProfileReducer,
        recruiters: recruitersReducer,
        jobs: jobsReducer,
        companies: companiesReducer,
        placements: placementsReducer,
        analytics: analyticsReducer,
        notifications: notificationsReducer,
        ui: uiReducer,
        documentUpload: documentUploadReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore non-serializable values in certain actions if needed
                ignoredActions: [],
                ignoredPaths: [],
            },
        }),
    devTools: import.meta.env.VITE_APP_ENV !== 'production',
});

export default store;
