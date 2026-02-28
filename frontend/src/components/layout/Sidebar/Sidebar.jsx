import { useRef, useEffect, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserRole, selectUser, logoutUser } from '../../../features/auth/authSlice';
import {
    selectSidebarOpen,
    selectSidebarCollapsed,
    toggleSidebarCollapse,
    setSidebarOpen,
} from '../../../features/ui/uiSlice';
import { ROLES, ROUTE_PATHS } from '../../../app/constants';
import {
    FiHome, FiUsers, FiBriefcase, FiBarChart2, FiSettings,
    FiUser, FiFileText, FiSearch, FiPlusCircle, FiList,
    FiLogOut, FiChevronLeft, FiChevronRight, FiGrid, FiAward,
    FiCheckSquare, FiGift, FiCalendar, FiShield, FiClipboard,
    FiBook,
} from 'react-icons/fi';
import './Sidebar.css';

/**
 * Navigation configs per role.
 * Each item can have a `section` string to group items visually.
 */
const NAV_CONFIG = {
    [ROLES.ADMIN]: [
        { section: 'Main' },
        { label: 'Dashboard', path: ROUTE_PATHS.ADMIN_DASHBOARD, icon: <FiHome /> },
        { section: 'Management' },
        { label: 'Students', path: ROUTE_PATHS.ADMIN_STUDENTS, icon: <FiUsers /> },
        { label: 'Companies', path: ROUTE_PATHS.ADMIN_COMPANIES, icon: <FiGrid /> },
        { label: 'Jobs', path: ROUTE_PATHS.ADMIN_JOBS, icon: <FiBriefcase /> },
        { label: 'Applications', path: ROUTE_PATHS.ADMIN_APPLICATIONS, icon: <FiFileText /> },
        { section: 'Analytics & Admin' },
        { label: 'Reports', path: ROUTE_PATHS.ADMIN_REPORTS, icon: <FiBarChart2 /> },
        { label: 'Audit Logs', path: ROUTE_PATHS.ADMIN_AUDIT_LOGS, icon: <FiShield /> },
        { label: 'Settings', path: ROUTE_PATHS.ADMIN_SETTINGS, icon: <FiSettings /> },
    ],
    [ROLES.STUDENT]: [
        { section: 'Main' },
        { label: 'Dashboard', path: ROUTE_PATHS.STUDENT_DASHBOARD, icon: <FiHome /> },
        { section: 'My Account' },
        { label: 'My Profile', path: ROUTE_PATHS.STUDENT_PROFILE, icon: <FiUser /> },
        { label: 'My Applications', path: ROUTE_PATHS.STUDENT_APPLICATIONS, icon: <FiFileText /> },
        { label: 'Eligibility', path: ROUTE_PATHS.STUDENT_ELIGIBILITY, icon: <FiCheckSquare /> },
        { label: 'Offers', path: ROUTE_PATHS.STUDENT_OFFERS, icon: <FiGift /> },
    ],
    [ROLES.RECRUITER]: [
        { section: 'Main' },
        { label: 'Dashboard', path: ROUTE_PATHS.RECRUITER_DASHBOARD, icon: <FiHome /> },
        { section: 'Recruitment' },
        { label: 'Company Profile', path: ROUTE_PATHS.RECRUITER_PROFILE, icon: <FiBook /> },
        { label: 'Post Job', path: ROUTE_PATHS.RECRUITER_POST_JOB, icon: <FiPlusCircle /> },
        { label: 'Candidates', path: ROUTE_PATHS.RECRUITER_CANDIDATES, icon: <FiUsers /> },
        { label: 'Interviews', path: ROUTE_PATHS.RECRUITER_INTERVIEWS, icon: <FiCalendar /> },
        { label: 'Offers', path: ROUTE_PATHS.RECRUITER_OFFERS, icon: <FiClipboard /> },
    ],
};

/**
 * Sidebar
 *
 * Premium collapsible sidebar navigation for the dashboard layout.
 * - Desktop: toggles between expanded (272px) and collapsed (76px) states
 * - Mobile: slides in as a drawer with an overlay backdrop
 * - Renders role-based navigation from Redux auth state
 * - Supports sectioned nav groups with dividers
 * - Highlights the active route
 */
const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const sidebarRef = useRef(null);

    const role = useSelector(selectUserRole);
    const user = useSelector(selectUser);
    const sidebarOpen = useSelector(selectSidebarOpen);
    const collapsed = useSelector(selectSidebarCollapsed);

    const navItems = NAV_CONFIG[role] || [];

    /* Close mobile drawer when navigating */
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                dispatch(setSidebarOpen(true));
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    /* Close mobile sidebar on route change */
    useEffect(() => {
        if (window.innerWidth <= 1024) {
            dispatch(setSidebarOpen(false));
        }
    }, [location.pathname, dispatch]);

    const handleLogout = useCallback(() => {
        dispatch(logoutUser());
        navigate('/login');
    }, [dispatch, navigate]);

    const handleOverlayClick = useCallback(() => {
        dispatch(setSidebarOpen(false));
    }, [dispatch]);

    const handleCollapseToggle = useCallback(() => {
        dispatch(toggleSidebarCollapse());
    }, [dispatch]);

    /* Determine if a nav link is active (exact match for dashboard root, prefix match for others) */
    const getRoleDashboardPath = () => {
        const map = {
            [ROLES.ADMIN]: ROUTE_PATHS.ADMIN_DASHBOARD,
            [ROLES.STUDENT]: ROUTE_PATHS.STUDENT_DASHBOARD,
            [ROLES.RECRUITER]: ROUTE_PATHS.RECRUITER_DASHBOARD,
        };
        return map[role] || '/dashboard';
    };

    return (
        <>
            {/* Mobile overlay backdrop */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay--visible' : ''}`}
                onClick={handleOverlayClick}
                aria-hidden="true"
            />

            <aside
                ref={sidebarRef}
                className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${sidebarOpen ? 'sidebar--open' : ''}`}
                aria-label="Main navigation"
            >
                {/* ---- HEADER / LOGO ---- */}
                <div className="sidebar__header">
                    <div className="sidebar__logo">
                        <span className="sidebar__logo-icon" aria-hidden="true">🎓</span>
                        <span className={`sidebar__logo-text ${collapsed ? 'sidebar__logo-text--hidden' : ''}`}>
                            PlaceTrack
                        </span>
                    </div>
                </div>

                {/* ---- NAVIGATION ---- */}
                <nav className="sidebar__nav" aria-label="Dashboard navigation">
                    {navItems.map((item, index) => {
                        /* Section divider */
                        if (item.section) {
                            return (
                                <div key={`section-${index}`} className="sidebar__section">
                                    <span className={`sidebar__section-label ${collapsed ? 'sidebar__section-label--hidden' : ''}`}>
                                        {item.section}
                                    </span>
                                    {collapsed && <div className="sidebar__section-dot" />}
                                </div>
                            );
                        }

                        const isDashboardRoot = item.path === getRoleDashboardPath();

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={isDashboardRoot}
                                className={({ isActive }) =>
                                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                                }
                                title={collapsed ? item.label : undefined}
                            >
                                <span className="sidebar__link-icon" aria-hidden="true">{item.icon}</span>
                                <span className={`sidebar__link-label ${collapsed ? 'sidebar__link-label--hidden' : ''}`}>
                                    {item.label}
                                </span>
                                {/* Active indicator bar */}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* ---- FOOTER ---- */}
                <div className="sidebar__footer">
                    {/* Collapse Toggle (desktop only) */}
                    <button
                        className="sidebar__collapse-btn"
                        onClick={handleCollapseToggle}
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <span className="sidebar__collapse-icon">
                            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                        </span>
                        <span className={`sidebar__collapse-text ${collapsed ? 'sidebar__collapse-text--hidden' : ''}`}>
                            Collapse
                        </span>
                    </button>

                    {/* Separator */}
                    <div className="sidebar__footer-divider" />

                    {/* User Info */}
                    <div className={`sidebar__user ${collapsed ? 'sidebar__user--collapsed' : ''}`}>
                        <div className="sidebar__user-avatar" title={user?.name || 'User'}>
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className={`sidebar__user-details ${collapsed ? 'sidebar__user-details--hidden' : ''}`}>
                            <p className="sidebar__user-name">{user?.name || 'User'}</p>
                            <p className="sidebar__user-role">{role}</p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        className="sidebar__link sidebar__logout"
                        onClick={handleLogout}
                        title={collapsed ? 'Logout' : undefined}
                    >
                        <span className="sidebar__link-icon" aria-hidden="true"><FiLogOut /></span>
                        <span className={`sidebar__link-label ${collapsed ? 'sidebar__link-label--hidden' : ''}`}>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
