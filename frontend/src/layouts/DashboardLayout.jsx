import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectSidebarOpen, selectSidebarCollapsed, toggleSidebar } from '../features/ui/uiSlice';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import DashboardHeader from '../components/layout/DashboardHeader/DashboardHeader';
import './DashboardLayout.css';

/**
 * DashboardLayout
 * Main application layout with sidebar navigation and header.
 * Supports collapsed sidebar state for compact viewing.
 */
const DashboardLayout = () => {
    const dispatch = useDispatch();
    const sidebarOpen = useSelector(selectSidebarOpen);
    const sidebarCollapsed = useSelector(selectSidebarCollapsed);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    return (
        <div
            className={`dashboard-layout ${sidebarCollapsed ? 'dashboard-layout--collapsed' : ''
                } ${!sidebarOpen ? 'dashboard-layout--closed' : ''}`}
        >
            <Sidebar />
            <div className="dashboard-layout__main">
                <DashboardHeader onToggleSidebar={handleToggleSidebar} />
                <main className="dashboard-layout__content">
                    <div className="dashboard-layout__content-inner">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
