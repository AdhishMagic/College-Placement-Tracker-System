import api from '../../services/api';
import { API_ENDPOINTS } from '../../app/constants';

const analyticsAPI = {
    getOverview: (params) => api.get(API_ENDPOINTS.ANALYTICS_OVERVIEW, { params }),
    getDepartment: (params) => api.get(API_ENDPOINTS.ANALYTICS_DEPARTMENT, { params }),
    getCompany: (params) => api.get(API_ENDPOINTS.ANALYTICS_COMPANY, { params }),
    getYearly: (params) => api.get(API_ENDPOINTS.ANALYTICS_YEARLY, { params }),
};

export default analyticsAPI;
