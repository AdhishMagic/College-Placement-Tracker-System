import api from '../../services/api';
import { API_ENDPOINTS } from '../../app/constants';

const jobsAPI = {
    getAll: (params) => api.get(API_ENDPOINTS.JOBS, { params }),
    getById: (id) => api.get(API_ENDPOINTS.JOB_DETAIL(id)),
    create: (data) => api.post(API_ENDPOINTS.JOBS, data),
    update: (id, data) => api.put(API_ENDPOINTS.JOB_DETAIL(id), data),
    delete: (id) => api.delete(API_ENDPOINTS.JOB_DETAIL(id)),
    apply: (id, data) => api.post(API_ENDPOINTS.JOB_APPLY(id), data),
    getApplicants: (id, params) => api.get(API_ENDPOINTS.JOB_APPLICANTS(id), { params }),
};

export default jobsAPI;
