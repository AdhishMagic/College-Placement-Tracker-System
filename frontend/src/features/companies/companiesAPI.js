import api from '../../services/api';
import { API_ENDPOINTS } from '../../app/constants';

const companiesAPI = {
    getAll: (params) => api.get(API_ENDPOINTS.COMPANIES, { params }),
    getById: (id) => api.get(API_ENDPOINTS.COMPANY_DETAIL(id)),
    create: (data) => api.post(API_ENDPOINTS.COMPANIES, data),
    update: (id, data) => api.put(API_ENDPOINTS.COMPANY_DETAIL(id), data),
    delete: (id) => api.delete(API_ENDPOINTS.COMPANY_DETAIL(id)),
};

export default companiesAPI;
