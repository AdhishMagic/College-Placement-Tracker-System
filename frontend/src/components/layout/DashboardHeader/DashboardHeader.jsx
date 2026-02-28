import { useSelector } from 'react-redux';
import { selectPageTitle, selectBreadcrumbs } from '../../../features/ui/uiSlice';
import { selectUser } from '../../../features/auth/authSlice';
import { selectUnreadCount } from '../../../features/notifications/notificationsSlice';
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import './DashboardHeader.css';

/**
 * DashboardHeader
 * Top header bar for the dashboard layout.
 */
const DashboardHeader = ({ onToggleSidebar }) => {
    const pageTitle = useSelector(selectPageTitle);
    const breadcrumbs = useSelector(selectBreadcrumbs);
    const user = useSelector(selectUser);
    const unreadCount = useSelector(selectUnreadCount);

    return (
        <header className="dashboard-header">
            <div className="dashboard-header__left">
                <button
                    className="dashboard-header__menu-btn"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FiMenu />
                </button>

                <div className="dashboard-header__title-area">
                    {breadcrumbs?.length > 0 && (
                        <nav className="dashboard-header__breadcrumbs" aria-label="Breadcrumb">
                            {breadcrumbs.map((crumb, idx) => (
                                <span key={idx} className="dashboard-header__breadcrumb">
                                    {crumb}
                                    {idx < breadcrumbs.length - 1 && (
                                        <span className="dashboard-header__breadcrumb-sep">/</span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}
                    {pageTitle && <h2 className="dashboard-header__page-title">{pageTitle}</h2>}
                </div>
            </div>

            <div className="dashboard-header__right">
                {/* Search */}
                <div className="dashboard-header__search">
                    <FiSearch className="dashboard-header__search-icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="dashboard-header__search-input"
                        id="global-search"
                    />
                </div>

                {/* Notifications */}
                <button className="dashboard-header__icon-btn" aria-label="Notifications">
                    <FiBell />
                    {unreadCount > 0 && (
                        <span className="dashboard-header__badge">{unreadCount}</span>
                    )}
                </button>

                {/* User Avatar */}
                <div className="dashboard-header__avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
