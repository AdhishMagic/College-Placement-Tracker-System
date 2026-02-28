import api from '../../services/api';
import { API_ENDPOINTS } from '../../app/constants';

/**
 * Students API Service
 */
const studentsAPI = {
    getAll: (params) => api.get(API_ENDPOINTS.STUDENTS, { params }),
    getById: (id) => api.get(API_ENDPOINTS.STUDENT_PROFILE(id)),
    update: (id, data) => api.put(API_ENDPOINTS.STUDENT_PROFILE(id), data),
    uploadResume: (id, formData) =>
        api.post(API_ENDPOINTS.STUDENT_RESUME(id), formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    getApplications: (id, params) =>
        api.get(API_ENDPOINTS.STUDENT_APPLICATIONS(id), { params }),
};

export default studentsAPI;
