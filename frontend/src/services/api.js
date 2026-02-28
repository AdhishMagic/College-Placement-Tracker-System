import axios from 'axios';
import config from '../app/config';

/**
 * Axios API Instance
 *
 * - Centralized base URL from environment config
 * - Automatic auth token injection via request interceptor
 * - Global error handling via response interceptor
 * - 401 auto-logout with token cleanup
 */
const api = axios.create({
    baseURL: config.API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ---- REQUEST INTERCEPTOR ----
api.interceptors.request.use(
    (requestConfig) => {
        const token = localStorage.getItem(config.AUTH_TOKEN_KEY);
        if (token) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        }
        return requestConfig;
    },
    (error) => Promise.reject(error)
);

// ---- RESPONSE INTERCEPTOR ----
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        // Auto-logout on 401 Unauthorized
        if (status === 401) {
            localStorage.removeItem(config.AUTH_TOKEN_KEY);
            // Redirect to login if not already there
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        // Log errors in development
        if (config.DEBUG) {
            console.error('[API Error]', {
                url: error.config?.url,
                method: error.config?.method,
                status,
                data: error.response?.data,
            });
        }

        return Promise.reject(error);
    }
);

export default api;
