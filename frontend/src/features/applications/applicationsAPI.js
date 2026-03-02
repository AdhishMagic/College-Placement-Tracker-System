/**
 * Applications API Service
 * Handles all application-tracking-related network requests.
 */
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const applicationsAPI = {
    /**
     * Fetch all applications for the current student.
     * Supports filtering, searching, sorting, and pagination via params.
     */
    getApplications: (params = {}) =>
        axios.get(`${API_BASE}/applications`, { params }),

    /**
     * Fetch a single application by its ID (full detail with timeline).
     */
    getApplicationDetail: (applicationId) =>
        axios.get(`${API_BASE}/applications/${applicationId}`),

    /**
     * Withdraw an application by its ID.
     */
    withdrawApplication: (applicationId) =>
        axios.patch(`${API_BASE}/applications/${applicationId}/withdraw`),
};

export default applicationsAPI;
