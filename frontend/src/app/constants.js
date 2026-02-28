/**
 * Role Constants
 * Defines the three user roles for the placement tracker system.
 */
export const ROLES = Object.freeze({
    ADMIN: 'admin',
    STUDENT: 'student',
    RECRUITER: 'recruiter',
});

/**
 * API Endpoints
 * Single source of truth for all backend API paths.
 */
export const API_ENDPOINTS = Object.freeze({
    // Auth
    AUTH_LOGIN: '/auth/login',
    AUTH_REGISTER: '/auth/register',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_ME: '/auth/me',
    AUTH_REFRESH: '/auth/refresh-token',

    // Students
    STUDENTS: '/students',
    STUDENT_PROFILE: (id) => `/students/${id}`,
    STUDENT_RESUME: (id) => `/students/${id}/resume`,
    STUDENT_APPLICATIONS: (id) => `/students/${id}/applications`,

    // Recruiters
    RECRUITERS: '/recruiters',
    RECRUITER_PROFILE: (id) => `/recruiters/${id}`,
    RECRUITER_JOBS: (id) => `/recruiters/${id}/jobs`,

    // Jobs / Drives
    JOBS: '/jobs',
    JOB_DETAIL: (id) => `/jobs/${id}`,
    JOB_APPLY: (id) => `/jobs/${id}/apply`,
    JOB_APPLICANTS: (id) => `/jobs/${id}/applicants`,

    // Companies
    COMPANIES: '/companies',
    COMPANY_DETAIL: (id) => `/companies/${id}`,

    // Placements
    PLACEMENTS: '/placements',
    PLACEMENT_DETAIL: (id) => `/placements/${id}`,

    // Analytics / Dashboard
    ANALYTICS_OVERVIEW: '/analytics/overview',
    ANALYTICS_DEPARTMENT: '/analytics/department',
    ANALYTICS_COMPANY: '/analytics/company',
    ANALYTICS_YEARLY: '/analytics/yearly',

    // Admin
    ADMIN_USERS: '/admin/users',
    ADMIN_SETTINGS: '/admin/settings',
    ADMIN_REPORTS: '/admin/reports',
    ADMIN_AUDIT_LOGS: '/admin/audit-logs',

    // Notifications
    NOTIFICATIONS: '/notifications',
    NOTIFICATION_READ: (id) => `/notifications/${id}/read`,
});

/**
 * Route Paths (Frontend)
 * Single source of truth for frontend navigation.
 */
export const ROUTE_PATHS = Object.freeze({
    // Public
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',

    // Dashboard (role-based)
    DASHBOARD: '/dashboard',

    // Admin
    ADMIN_DASHBOARD: '/dashboard/admin',
    ADMIN_STUDENTS: '/dashboard/admin/students',
    ADMIN_RECRUITERS: '/dashboard/admin/recruiters',
    ADMIN_COMPANIES: '/dashboard/admin/companies',
    ADMIN_JOBS: '/dashboard/admin/jobs',
    ADMIN_APPLICATIONS: '/dashboard/admin/applications',
    ADMIN_PLACEMENTS: '/dashboard/admin/placements',
    ADMIN_ANALYTICS: '/dashboard/admin/analytics',
    ADMIN_REPORTS: '/dashboard/admin/reports',
    ADMIN_AUDIT_LOGS: '/dashboard/admin/audit-logs',
    ADMIN_SETTINGS: '/dashboard/admin/settings',

    // Student
    STUDENT_DASHBOARD: '/dashboard/student',
    STUDENT_PROFILE: '/dashboard/student/profile',
    STUDENT_JOBS: '/dashboard/student/jobs',
    STUDENT_APPLICATIONS: '/dashboard/student/applications',
    STUDENT_ELIGIBILITY: '/dashboard/student/eligibility',
    STUDENT_OFFERS: '/dashboard/student/offers',
    STUDENT_RESUME: '/dashboard/student/resume',
    STUDENT_COMPANIES: '/dashboard/student/companies',

    // Recruiter
    RECRUITER_DASHBOARD: '/dashboard/recruiter',
    RECRUITER_PROFILE: '/dashboard/recruiter/profile',
    RECRUITER_POST_JOB: '/dashboard/recruiter/post-job',
    RECRUITER_MY_JOBS: '/dashboard/recruiter/my-jobs',
    RECRUITER_CANDIDATES: '/dashboard/recruiter/candidates',
    RECRUITER_APPLICANTS: '/dashboard/recruiter/applicants',
    RECRUITER_INTERVIEWS: '/dashboard/recruiter/interviews',
    RECRUITER_OFFERS: '/dashboard/recruiter/offers',
    RECRUITER_ANALYTICS: '/dashboard/recruiter/analytics',
});

/**
 * Application Status Constants
 */
export const APPLICATION_STATUS = Object.freeze({
    PENDING: 'pending',
    SHORTLISTED: 'shortlisted',
    INTERVIEW: 'interview',
    SELECTED: 'selected',
    REJECTED: 'rejected',
    WITHDRAWN: 'withdrawn',
});

/**
 * Pagination Defaults
 */
export const PAGINATION = Object.freeze({
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
});
