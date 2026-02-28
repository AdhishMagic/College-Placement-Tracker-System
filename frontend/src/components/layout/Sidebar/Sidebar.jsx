import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserRole, selectUser } from '../../../features/auth/authSlice';
import { selectSidebarCollapsed, toggleSidebarCollapse } from '../../../features/ui/uiSlice';
import { logoutUser } from '../../../features/auth/authSlice';
import { ROLES } from '../../../app/constants';
import {
    FiHome, FiUsers, FiBriefcase, FiBarChart2, FiSettings,
    FiUser, FiFileText, FiSearch, FiPlusCircle, FiList,
    FiLogOut, FiChevronLeft, FiChevronRight, FiGrid, FiAward,
} from 'react-icons/fi';
import './Sidebar.css';

/**
 * Navigation configs per role.
 */
const NAV_CONFIG = {
    [ROLES.ADMIN]: [
        { label: 'Dashboard', path: '/dashboard/admin', icon: <FiHome /> },
        { label: 'Students', path: '/dashboard/admin/students', icon: <FiUsers /> },
        { label: 'Recruiters', path: '/dashboard/admin/recruiters', icon: <FiBriefcase /> },
        { label: 'Companies', path: '/dashboard/admin/companies', icon: <FiGrid /> },
        { label: 'Jobs', path: '/dashboard/admin/jobs', icon: <FiList /> },
        { label: 'Placements', path: '/dashboard/admin/placements', icon: <FiAward /> },
        { label: 'Analytics', path: '/dashboard/admin/analytics', icon: <FiBarChart2 /> },
        { label: 'Settings', path: '/dashboard/admin/settings', icon: <FiSettings /> },
    ],
    [ROLES.STUDENT]: [
        { label: 'Dashboard', path: '/dashboard/student', icon: <FiHome /> },
        { label: 'Profile', path: '/dashboard/student/profile', icon: <FiUser /> },
        { label: 'Browse Jobs', path: '/dashboard/student/jobs', icon: <FiSearch /> },
        { label: 'Applications', path: '/dashboard/student/applications', icon: <FiFileText /> },
        { label: 'Resume', path: '/dashboard/student/resume', icon: <FiFileText /> },
    ],
    [ROLES.RECRUITER]: [
        { label: 'Dashboard', path: '/dashboard/recruiter', icon: <FiHome /> },
        { label: 'Profile', path: '/dashboard/recruiter/profile', icon: <FiUser /> },
        { label: 'Post Job', path: '/dashboard/recruiter/post-job', icon: <FiPlusCircle /> },
        { label: 'My Jobs', path: '/dashboard/recruiter/my-jobs', icon: <FiList /> },
        { label: 'Applicants', path: '/dashboard/recruiter/applicants', icon: <FiUsers /> },
    ],
};

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector(selectUserRole);
    const user = useSelector(selectUser);
    const collapsed = useSelector(selectSidebarCollapsed);

    const navItems = NAV_CONFIG[role] || [];

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
            {/* Logo */}
            <div className="sidebar__header">
                <span className="sidebar__logo-icon">🎓</span>
                {!collapsed && <span className="sidebar__logo-text">PlaceTrack</span>}
            </div>

            {/* Navigation */}
            <nav className="sidebar__nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === `/dashboard/${role}`}
                        className={({ isActive }) =>
                            `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                        }
                        title={collapsed ? item.label : undefined}
                    >
                        <span className="sidebar__link-icon">{item.icon}</span>
                        {!collapsed && <span className="sidebar__link-label">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="sidebar__footer">
                {/* Collapse Toggle */}
                <button
                    className="sidebar__collapse-btn"
                    onClick={() => dispatch(toggleSidebarCollapse())}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                </button>

                {/* User Info */}
                {!collapsed && user && (
                    <div className="sidebar__user">
                        <div className="sidebar__user-avatar">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="sidebar__user-info">
                            <p className="sidebar__user-name">{user.name || 'User'}</p>
                            <p className="sidebar__user-role">{role}</p>
                        </div>
                    </div>
                )}

                {/* Logout */}
                <button className="sidebar__link sidebar__logout" onClick={handleLogout}>
                    <span className="sidebar__link-icon"><FiLogOut /></span>
                    {!collapsed && <span className="sidebar__link-label">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
