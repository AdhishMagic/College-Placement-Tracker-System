import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES } from '../app/constants';

// Guards
import { ProtectedRoute, RoleRoute, GuestRoute } from './guards';

// Layouts
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Loading fallback
import Spinner from '../components/ui/Spinner/Spinner';

// ---- LAZY LOADED PAGES ----
// Public
const HomePage = lazy(() => import('../pages/public/HomePage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));

// Admin Dashboard
const AdminDashboard = lazy(() => import('../pages/dashboard/admin/AdminDashboard'));
const AdminStudents = lazy(() => import('../pages/dashboard/admin/AdminStudents'));
const AdminRecruiters = lazy(() => import('../pages/dashboard/admin/AdminRecruiters'));
const AdminCompanies = lazy(() => import('../pages/dashboard/admin/AdminCompanies'));
const AdminJobs = lazy(() => import('../pages/dashboard/admin/AdminJobs'));
const AdminPlacements = lazy(() => import('../pages/dashboard/admin/AdminPlacements'));
const AdminAnalytics = lazy(() => import('../pages/dashboard/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('../pages/dashboard/admin/AdminSettings'));

// Student Dashboard
const StudentDashboard = lazy(() => import('../pages/dashboard/student/StudentDashboard'));
const StudentProfile = lazy(() => import('../pages/dashboard/student/StudentProfile'));
const StudentJobs = lazy(() => import('../pages/dashboard/student/StudentJobs'));
const StudentApplications = lazy(() => import('../pages/dashboard/student/StudentApplications'));
const StudentResume = lazy(() => import('../pages/dashboard/student/StudentResume'));

// Recruiter Dashboard
const RecruiterDashboard = lazy(() => import('../pages/dashboard/recruiter/RecruiterDashboard'));
const RecruiterProfile = lazy(() => import('../pages/dashboard/recruiter/RecruiterProfile'));
const RecruiterPostJob = lazy(() => import('../pages/dashboard/recruiter/RecruiterPostJob'));
const RecruiterMyJobs = lazy(() => import('../pages/dashboard/recruiter/RecruiterMyJobs'));
const RecruiterApplicants = lazy(() => import('../pages/dashboard/recruiter/RecruiterApplicants'));

/**
 * Suspense wrapper for lazy-loaded pages.
 */
const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<Spinner fullScreen />}>
        {children}
    </Suspense>
);

/**
 * Application Router Configuration
 *
 * ARCHITECTURE:
 * ┌─ RootLayout (global providers)
 * │   ├─ Public routes (/, 404)
 * │   ├─ AuthLayout (login, register)
 * │   │   └─ GuestRoute guard
 * │   └─ DashboardLayout (sidebar, header)
 * │       └─ ProtectedRoute guard
 * │           ├─ /dashboard/admin/* ─ RoleRoute(admin)
 * │           ├─ /dashboard/student/* ─ RoleRoute(student)
 * │           └─ /dashboard/recruiter/* ─ RoleRoute(recruiter)
 * └─ 404 catch-all
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            // ---- PUBLIC ROUTES ----
            {
                index: true,
                element: (
                    <SuspenseWrapper>
                        <HomePage />
                    </SuspenseWrapper>
                ),
            },

            // ---- AUTH ROUTES (Guest Only) ----
            {
                element: (
                    <GuestRoute>
                        <AuthLayout />
                    </GuestRoute>
                ),
                children: [
                    {
                        path: 'login',
                        element: (
                            <SuspenseWrapper>
                                <LoginPage />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: 'register',
                        element: (
                            <SuspenseWrapper>
                                <RegisterPage />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: 'forgot-password',
                        element: (
                            <SuspenseWrapper>
                                <ForgotPasswordPage />
                            </SuspenseWrapper>
                        ),
                    },
                ],
            },

            // ---- DASHBOARD ROUTES (Protected) ----
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    // Default redirect based on role (handled in DashboardRedirect)
                    {
                        index: true,
                        element: <DashboardRedirect />,
                    },

                    // ---- ADMIN ROUTES ----
                    {
                        path: 'admin',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                                <SuspenseWrapper>
                                    <AdminDashboard />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'admin/students',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                                <SuspenseWrapper>
                                    <AdminStudents />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'admin/recruiters',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                                <SuspenseWrapper>
                                    <AdminRecruiters />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'admin/companies',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                                <SuspenseWrapper>
                                    <AdminCompanies />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'admin/jobs',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                                <SuspenseWrapper>
                                    <AdminJobs />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'admin/placements',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                                <SuspenseWrapper>
                                    <AdminPlacements />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'admin/analytics',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                                <SuspenseWrapper>
                                    <AdminAnalytics />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'admin/settings',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                                <SuspenseWrapper>
                                    <AdminSettings />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },

                    // ---- STUDENT ROUTES ----
                    {
                        path: 'student',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.STUDENT]}>
                                <SuspenseWrapper>
                                    <StudentDashboard />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'student/profile',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.STUDENT]}>
                                <SuspenseWrapper>
                                    <StudentProfile />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'student/jobs',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.STUDENT]}>
                                <SuspenseWrapper>
                                    <StudentJobs />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'student/applications',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.STUDENT]}>
                                <SuspenseWrapper>
                                    <StudentApplications />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'student/resume',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.STUDENT]}>
                                <SuspenseWrapper>
                                    <StudentResume />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },

                    // ---- RECRUITER ROUTES ----
                    {
                        path: 'recruiter',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.RECRUITER]}>
                                <SuspenseWrapper>
                                    <RecruiterDashboard />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'recruiter/profile',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.RECRUITER]}>
                                <SuspenseWrapper>
                                    <RecruiterProfile />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'recruiter/post-job',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.RECRUITER]}>
                                <SuspenseWrapper>
                                    <RecruiterPostJob />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'recruiter/my-jobs',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.RECRUITER]}>
                                <SuspenseWrapper>
                                    <RecruiterMyJobs />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'recruiter/applicants',
                        element: (
                            <RoleRoute allowedRoles={[ROLES.RECRUITER]}>
                                <SuspenseWrapper>
                                    <RecruiterApplicants />
                                </SuspenseWrapper>
                            </RoleRoute>
                        ),
                    },
                ],
            },

            // ---- 404 CATCH-ALL ----
            {
                path: '*',
                element: (
                    <SuspenseWrapper>
                        <NotFoundPage />
                    </SuspenseWrapper>
                ),
            },
        ],
    },
]);

/**
 * DashboardRedirect
 * Redirects /dashboard to the appropriate role-based sub-route.
 */
function DashboardRedirect() {
    const role = useSelector((state) => state.auth.role);

    const roleRouteMap = {
        [ROLES.ADMIN]: '/dashboard/admin',
        [ROLES.STUDENT]: '/dashboard/student',
        [ROLES.RECRUITER]: '/dashboard/recruiter',
    };

    const target = roleRouteMap[role] || '/login';
    return <Navigate to={target} replace />;
}

export default router;
