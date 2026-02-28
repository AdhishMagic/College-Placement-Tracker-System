/**
 * Environment Configuration
 * Centralizes all environment variable access with defaults.
 */
const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
    APP_NAME: import.meta.env.VITE_APP_NAME || 'College Placement Tracker',
    DEBUG: import.meta.env.VITE_DEBUG === 'true',
    AUTH_TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'cpts_auth_token',
    MAX_UPLOAD_SIZE: parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE || '5242880', 10),
    IS_DEV: import.meta.env.VITE_APP_ENV === 'development',
    IS_PROD: import.meta.env.VITE_APP_ENV === 'production',
};

export default config;
