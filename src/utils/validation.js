/**
 * Email validation using regex
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Password validation
 * Requirements: At least 6 characters, contains letter and number
 */
export const validatePassword = (password) => {
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters' };
    }
    if (!/[a-zA-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one letter' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true, message: '' };
};

/**
 * Name validation
 */
export const validateName = (name) => {
    if (!name || name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters' };
    }
    return { valid: true, message: '' };
};

/**
 * Form validation helper
 */
export const validateForm = (fields) => {
    const errors = {};

    if (fields.email !== undefined) {
        if (!validateEmail(fields.email)) {
            errors.email = 'Please enter a valid email address';
        }
    }

    if (fields.password !== undefined) {
        const passwordCheck = validatePassword(fields.password);
        if (!passwordCheck.valid) {
            errors.password = passwordCheck.message;
        }
    }

    if (fields.name !== undefined) {
        const nameCheck = validateName(fields.name);
        if (!nameCheck.valid) {
            errors.name = nameCheck.message;
        }
    }

    if (fields.confirmPassword !== undefined && fields.password !== undefined) {
        if (fields.password !== fields.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
