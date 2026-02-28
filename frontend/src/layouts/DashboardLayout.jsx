import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    selectSidebarOpen,
    selectSidebarCollapsed,
    selectTheme,
} from '../features/ui/uiSlice';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import DashboardHeader from '../components/layout/DashboardHeader/DashboardHeader';
import './DashboardLayout.css';

/**
 * DashboardLayout
 *
 * Main application layout that wraps all protected dashboard pages.
 * Manages the sidebar + header chrome and synchronizes the theme
 * data attribute on the <html> element for CSS variable theming.
 *
 * Architecture:
 *  ┌─────────────────────────────────────────┐
 *  │  Sidebar (fixed left)                   │
 *  │  ┌─────────────────────────────────────┐ │
 *  │  │  DashboardHeader (fixed top)        │ │
 *  │  ├─────────────────────────────────────┤ │
 *  │  │  Main Content Area (<Outlet />)     │ │
 *  │  │  - Scrollable                       │ │
 *  │  │  - Max-width constrained            │ │
 *  │  │  - Animated entry                   │ │
 *  │  └─────────────────────────────────────┘ │
 *  └─────────────────────────────────────────┘
 */
const DashboardLayout = () => {
    const sidebarOpen = useSelector(selectSidebarOpen);
    const sidebarCollapsed = useSelector(selectSidebarCollapsed);
    const theme = useSelector(selectTheme);

    /* Sync theme to <html> data attribute for CSS variable theming */
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);

        /* Update meta theme-color for mobile browsers */
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute(
                'content',
                theme === 'dark' ? '#0F1117' : '#133E6D'
            );
        }
    }, [theme]);

    /* Build layout class string */
    const layoutClasses = [
        'dashboard-layout',
        sidebarCollapsed ? 'dashboard-layout--collapsed' : '',
        !sidebarOpen ? 'dashboard-layout--closed' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={layoutClasses}>
            <Sidebar />
            <div className="dashboard-layout__main">
                <DashboardHeader />
                <main className="dashboard-layout__content" id="dashboard-content">
                    <div className="dashboard-layout__content-inner">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
