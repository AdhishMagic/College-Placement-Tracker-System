import { Outlet } from 'react-router-dom';
import ToastContainer from '../components/ui/Toast/ToastContainer';

/**
 * RootLayout
 * Top-level layout wrapping the entire application.
 * Houses global overlays: toasts, modals, etc.
 */
const RootLayout = () => {
    return (
        <div className="root-layout">
            <Outlet />
            <ToastContainer />
        </div>
    );
};

export default RootLayout;
