import api from '../../services/api';
import { API_ENDPOINTS } from '../../app/constants';

const recruitersAPI = {
    getAll: (params) => api.get(API_ENDPOINTS.RECRUITERS, { params }),
    getById: (id) => api.get(API_ENDPOINTS.RECRUITER_PROFILE(id)),
    update: (id, data) => api.put(API_ENDPOINTS.RECRUITER_PROFILE(id), data),
    getJobs: (id, params) => api.get(API_ENDPOINTS.RECRUITER_JOBS(id), { params }),
};

export default recruitersAPI;
