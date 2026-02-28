/**
 * Form Validation Utilities
 * Pure validation functions for form fields.
 */

export const validators = {
    required: (value) => (!value?.toString().trim() ? 'This field is required' : null),

    email: (value) => {
        if (!value) return null;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !re.test(value) ? 'Invalid email address' : null;
    },

    minLength: (min) => (value) => {
        if (!value) return null;
        return value.length < min ? `Must be at least ${min} characters` : null;
    },

    maxLength: (max) => (value) => {
        if (!value) return null;
        return value.length > max ? `Must be no more than ${max} characters` : null;
    },

    phone: (value) => {
        if (!value) return null;
        const re = /^[6-9]\d{9}$/;
        return !re.test(value) ? 'Invalid phone number' : null;
    },

    cgpa: (value) => {
        if (!value) return null;
        const num = parseFloat(value);
        return isNaN(num) || num < 0 || num > 10 ? 'CGPA must be between 0 and 10' : null;
    },

    url: (value) => {
        if (!value) return null;
        try {
            new URL(value);
            return null;
        } catch {
            return 'Invalid URL';
        }
    },

    match: (fieldName, matchValue) => (value) => {
        return value !== matchValue ? `Must match ${fieldName}` : null;
    },
};

/**
 * Run multiple validators on a single value.
 * Returns the first error message, or null if all pass.
 */
export const validate = (value, rules = []) => {
    for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
    }
    return null;
};

/**
 * Validate an entire form object.
 * @param {Object} values — { fieldName: value }
 * @param {Object} schema — { fieldName: [validators] }
 * @returns {Object} errors — { fieldName: errorMessage | null }
 */
export const validateForm = (values, schema) => {
    const errors = {};
    let isValid = true;

    for (const field of Object.keys(schema)) {
        const error = validate(values[field], schema[field]);
        errors[field] = error;
        if (error) isValid = false;
    }

    return { errors, isValid };
};
