class Validator {
    /**
     * Checks if the given value is a non-negative integer.
     *
     * @param {number} number - The value to check.
     * @returns {boolean} Returns true if the value is a non-negative integer, otherwise false.
     */
    static checkInt(number) {
        if (isNaN(number)) {
            return false;
        }
        if (number % 1 !== 0) {
            return false;
        }
        if (number < 0) {
            return false;
        }
        return true;
    }

    /**
     * Checks if the provided value is a non-empty string.
     *
     * @param {any} str - The value to check.
     * @returns {boolean} Returns true if the value is a non-empty string, otherwise false.
     */
    static checkString(str) {
        if (typeof str !== 'string') {
            return false;
        }
        if (str.trim() === "") {
            return false;
        }
        return true;
    }
}

/**
 * Registration Form Handler - Manages form submission, validation, and user feedback
 * Integrates with UserTable for data persistence and Statistics for tracking interactions
 */
class RegistrationForm {
    /**
     * Initialize the registration form with event listeners and validation
     */
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.init();
    }

    /**
     * Set up form event listeners
     */
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    /**
     * Handle form submission
     * @param {Event} event - The form submit event
     */
    handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const userData = {
            name: formData.get('name').trim(),
            age: parseInt(formData.get('age')),
            email: formData.get('email').trim()
        };

        if (this.validateData(userData)) {
            if (window.userTable) {
                window.userTable.addUser(userData);
            }

            if (window.statistics) {
                window.statistics.incrementRegister();
            }

            this.clearForm();
            this.showMessage('User registered successfully!', 'success');
        }
    }

    /**
     * Validate user data using the Validator class
     * @param {Object} userData - The user data to validate
     * @returns {boolean} True if data is valid, false otherwise
     */
    validateData(userData) {
        if (!Validator.checkString(userData.name)) {
            this.showMessage('Name is required', 'error');
            return false;
        }

        if (!Validator.checkInt(userData.age) || userData.age < 1 || userData.age > 120) {
            this.showMessage('Age must be between 1 and 120', 'error');
            return false;
        }

        if (!this.isValidEmail(userData.email)) {
            this.showMessage('Please enter a valid email', 'error');
            return false;
        }

        return true;
    }

    /**
     * Check if email format is valid
     * @param {string} email - Email to validate
     * @returns {boolean} True if email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Clear the form inputs
     */
    clearForm() {
        this.form.reset();
    }

    /**
     * Show a message to the user
     * @param {string} message - Message to display
     * @param {string} type - Message type ('success' or 'error')
     */
    showMessage(message, type) {
        const notification = document.createElement('div');
        const className = type === 'success' ? 'is-success' : 'is-danger';
        notification.className = `notification ${className} is-light`;
        notification.innerHTML = `
            <button class="delete" onclick="this.parentElement.remove()"></button>
            ${message}
        `;

        const formContent = this.form.parentElement;
        formContent.insertBefore(notification, this.form);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }
}

/**
 * Initialize the registration form when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    window.registrationForm = new RegistrationForm();
});
