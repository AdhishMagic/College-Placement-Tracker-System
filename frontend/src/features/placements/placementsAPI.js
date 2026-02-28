import api from '../../services/api';
import { API_ENDPOINTS } from '../../app/constants';

const placementsAPI = {
    getAll: (params) => api.get(API_ENDPOINTS.PLACEMENTS, { params }),
    getById: (id) => api.get(API_ENDPOINTS.PLACEMENT_DETAIL(id)),
    create: (data) => api.post(API_ENDPOINTS.PLACEMENTS, data),
    update: (id, data) => api.put(API_ENDPOINTS.PLACEMENT_DETAIL(id), data),
};

export default placementsAPI;
