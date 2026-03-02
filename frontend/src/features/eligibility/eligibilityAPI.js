/**
 * Eligibility API Service
 * Handles all eligibility-related network requests.
 */
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const eligibilityAPI = {
    /**
     * Fetch eligibility data for the current student.
     * Returns eligible and not-eligible jobs with criteria details.
     */
    getEligibility: (params = {}) =>
        axios.get(`${API_BASE}/eligibility`, { params }),

    /**
     * Fetch a single job's eligibility detail by job ID.
     */
    getJobEligibility: (jobId) =>
        axios.get(`${API_BASE}/eligibility/${jobId}`),

    /**
     * Refresh eligibility status (re-run filtering).
     */
    refreshEligibility: () =>
        axios.post(`${API_BASE}/eligibility/refresh`),
};

export default eligibilityAPI;
