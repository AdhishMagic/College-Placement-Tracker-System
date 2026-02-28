import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    selectPageTitle,
    selectBreadcrumbs,
    selectTheme,
    toggleTheme,
    toggleSidebar,
    toggleSidebarCollapse,
} from '../../../features/ui/uiSlice';
import { selectUser, selectUserRole, logoutUser } from '../../../features/auth/authSlice';
import { selectUnreadCount } from '../../../features/notifications/notificationsSlice';
import {
    FiMenu, FiBell, FiSearch, FiSun, FiMoon,
    FiUser, FiSettings, FiLogOut, FiChevronRight,
    FiHelpCircle, FiX,
} from 'react-icons/fi';
import './DashboardHeader.css';

/**
 * DashboardHeader
 *
 * Enterprise-grade top navigation bar for the dashboard layout.
 * Features:
 *  - Hamburger menu toggle (sidebar control)
 *  - Breadcrumb navigation
 *  - Global search bar
 *  - Dark/Light theme toggle
 *  - Notification bell with unread badge
 *  - Profile dropdown with avatar, role display, and actions
 */
const DashboardHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const pageTitle = useSelector(selectPageTitle);
    const breadcrumbs = useSelector(selectBreadcrumbs);
    const user = useSelector(selectUser);
    const role = useSelector(selectUserRole);
    const theme = useSelector(selectTheme);
    const unreadCount = useSelector(selectUnreadCount);

    const [profileOpen, setProfileOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const profileRef = useRef(null);
    const profileBtnRef = useRef(null);

    /* Close profile dropdown when clicking outside */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(e.target) &&
                !profileBtnRef.current?.contains(e.target)
            ) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /* Close on Escape */
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setProfileOpen(false);
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    const handleToggleSidebar = useCallback(() => {
        if (window.innerWidth <= 1024) {
            dispatch(toggleSidebar());
        } else {
            dispatch(toggleSidebarCollapse());
        }
    }, [dispatch]);

    const handleThemeToggle = useCallback(() => {
        dispatch(toggleTheme());
    }, [dispatch]);

    const handleLogout = useCallback(() => {
        setProfileOpen(false);
        dispatch(logoutUser());
        navigate('/login');
    }, [dispatch, navigate]);

    const handleProfileNavigate = useCallback((path) => {
        setProfileOpen(false);
        navigate(path);
    }, [navigate]);

    const getProfilePath = () => {
        const map = {
            admin: '/dashboard/admin/settings',
            student: '/dashboard/student/profile',
            recruiter: '/dashboard/recruiter/profile',
        };
        return map[role] || '/dashboard';
    };

    return (
        <header className="dashboard-header" id="dashboard-header">
            {/* ---- LEFT SECTION ---- */}
            <div className="dashboard-header__left">
                <button
                    className="dashboard-header__menu-btn"
                    onClick={handleToggleSidebar}
                    aria-label="Toggle sidebar"
                    id="sidebar-toggle"
                >
                    <FiMenu />
                </button>

                <div className="dashboard-header__title-area">
                    {breadcrumbs?.length > 0 && (
                        <nav className="dashboard-header__breadcrumbs" aria-label="Breadcrumb">
                            {breadcrumbs.map((crumb, idx) => (
                                <span key={idx} className="dashboard-header__breadcrumb">
                                    <span className={idx === breadcrumbs.length - 1 ? 'dashboard-header__breadcrumb--current' : ''}>
                                        {crumb}
                                    </span>
                                    {idx < breadcrumbs.length - 1 && (
                                        <FiChevronRight className="dashboard-header__breadcrumb-sep" />
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}
                    {pageTitle && (
                        <h2 className="dashboard-header__page-title">{pageTitle}</h2>
                    )}
                </div>
            </div>

            {/* ---- RIGHT SECTION ---- */}
            <div className="dashboard-header__right">
                {/* Search */}
                <div className={`dashboard-header__search ${searchFocused ? 'dashboard-header__search--focused' : ''}`}>
                    <FiSearch className="dashboard-header__search-icon" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="dashboard-header__search-input"
                        id="global-search"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        aria-label="Global search"
                    />
                    <kbd className="dashboard-header__search-shortcut">⌘K</kbd>
                </div>

                {/* Theme Toggle */}
                <button
                    className="dashboard-header__icon-btn dashboard-header__theme-btn"
                    onClick={handleThemeToggle}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    id="theme-toggle"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    <span className={`dashboard-header__theme-icon ${theme === 'light' ? '' : 'dashboard-header__theme-icon--rotated'}`}>
                        {theme === 'light' ? <FiMoon /> : <FiSun />}
                    </span>
                </button>

                {/* Notifications */}
                <button
                    className="dashboard-header__icon-btn"
                    aria-label="Notifications"
                    id="notifications-btn"
                    title="Notifications"
                >
                    <FiBell />
                    {unreadCount > 0 && (
                        <span className="dashboard-header__badge" aria-label={`${unreadCount} unread notifications`}>
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </button>

                {/* Profile */}
                <div className="dashboard-header__profile-wrapper">
                    <button
                        ref={profileBtnRef}
                        className="dashboard-header__profile-btn"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        aria-expanded={profileOpen}
                        aria-haspopup="true"
                        id="profile-menu-btn"
                    >
                        <div className="dashboard-header__avatar">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="dashboard-header__profile-info">
                            <span className="dashboard-header__profile-name">
                                {user?.name || 'User'}
                            </span>
                            <span className="dashboard-header__profile-role">
                                {role || 'Role'}
                            </span>
                        </div>
                    </button>

                    {/* Profile Dropdown */}
                    {profileOpen && (
                        <div
                            ref={profileRef}
                            className="dashboard-header__dropdown"
                            role="menu"
                            aria-label="User menu"
                            id="profile-dropdown"
                        >
                            {/* Dropdown header */}
                            <div className="dashboard-header__dropdown-header">
                                <div className="dashboard-header__dropdown-avatar">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="dashboard-header__dropdown-user">
                                    <p className="dashboard-header__dropdown-name">{user?.name || 'User'}</p>
                                    <p className="dashboard-header__dropdown-email">{user?.email || 'user@example.com'}</p>
                                </div>
                            </div>

                            <div className="dashboard-header__dropdown-divider" />

                            {/* Menu Items */}
                            <button
                                className="dashboard-header__dropdown-item"
                                onClick={() => handleProfileNavigate(getProfilePath())}
                                role="menuitem"
                            >
                                <FiUser className="dashboard-header__dropdown-icon" />
                                <span>My Profile</span>
                            </button>

                            <button
                                className="dashboard-header__dropdown-item"
                                onClick={() => handleProfileNavigate(`/dashboard/${role}/settings`)}
                                role="menuitem"
                            >
                                <FiSettings className="dashboard-header__dropdown-icon" />
                                <span>Settings</span>
                            </button>

                            <button
                                className="dashboard-header__dropdown-item"
                                role="menuitem"
                            >
                                <FiHelpCircle className="dashboard-header__dropdown-icon" />
                                <span>Help & Support</span>
                            </button>

                            <div className="dashboard-header__dropdown-divider" />

                            <button
                                className="dashboard-header__dropdown-item dashboard-header__dropdown-item--danger"
                                onClick={handleLogout}
                                role="menuitem"
                            >
                                <FiLogOut className="dashboard-header__dropdown-icon" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
