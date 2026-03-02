import { usePageMeta } from '../../../hooks';
import SystemSettingsPage from '../../admin/SystemSettingsPage';

const AdminSettings = () => {
    usePageMeta('System Settings', ['Admin', 'Settings']);

    return (
        <div className="h-full">
            <SystemSettingsPage />
        </div>
    );
};

export default AdminSettings;
