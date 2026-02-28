import api from '../../services/api';
import { API_ENDPOINTS } from '../../app/constants';

/**
 * Auth API Service
 * Handles all authentication-related HTTP requests.
 */
const authAPI = {
    login: (credentials) => api.post(API_ENDPOINTS.AUTH_LOGIN, credentials),
    register: (userData) => api.post(API_ENDPOINTS.AUTH_REGISTER, userData),
    logout: () => api.post(API_ENDPOINTS.AUTH_LOGOUT),
    getMe: () => api.get(API_ENDPOINTS.AUTH_ME),
    refreshToken: () => api.post(API_ENDPOINTS.AUTH_REFRESH),
};

export default authAPI;
