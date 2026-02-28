/**
 * Utility Helpers
 * Pure functions with no side effects — safe for use anywhere.
 */

/**
 * Format a number with commas (e.g., 5000 → "5,000")
 */
export const formatNumber = (num) => {
    if (num == null) return '0';
    return Number(num).toLocaleString('en-IN');
};

/**
 * Format currency (INR)
 */
export const formatCurrency = (amount) => {
    if (amount == null) return '₹0';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Format a date string into a readable format
 */
export const formatDate = (dateString, options = {}) => {
    if (!dateString) return '';
    const defaultOpts = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', { ...defaultOpts, ...options });
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '…';
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Debounce function
 */
export const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

/**
 * Get initials from a name (e.g., "John Doe" → "JD")
 */
export const getInitials = (name) => {
    if (!name) return 'U';
    return name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
};

/**
 * Deep clone an object
 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Check if an object is empty
 */
export const isEmpty = (obj) => {
    if (!obj) return true;
    return Object.keys(obj).length === 0;
};

/**
 * Build query string from params object
 */
export const buildQueryString = (params) => {
    const filtered = Object.entries(params).filter(
        ([, value]) => value !== '' && value !== null && value !== undefined
    );
    return new URLSearchParams(filtered).toString();
};
