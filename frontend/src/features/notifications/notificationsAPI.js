import api from '../../services/api';
import { API_ENDPOINTS } from '../../app/constants';

const notificationsAPI = {
    getAll: (params) => api.get(API_ENDPOINTS.NOTIFICATIONS, { params }),
    markRead: (id) => api.patch(API_ENDPOINTS.NOTIFICATION_READ(id)),
};

export default notificationsAPI;
