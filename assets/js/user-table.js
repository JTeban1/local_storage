class UserTable {
    /**
     * Initialize the user table with localStorage integration
     * Sets up storage key, initializes data arrays, and loads persistent data
     */
    constructor() {
        this.tableBody = document.getElementById('dataTableBody');
        this.users = [];
        this.nextId = 1;
        this.storageKey = 'registeredUsers';
        this.init();
    }

    /**
     * Initialize the table with existing data
     */
    init() {
        this.loadFromStorage();
        this.renderAllUsers();
    }

    /**
     * Load data from localStorage or use sample data if none exists
     */
    loadFromStorage() {
        const savedData = localStorage.getItem(this.storageKey);
        
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            this.users = parsedData.users || [];
            this.nextId = parsedData.nextId || 1;
        } else {
            // Load sample data only if no saved data exists
            this.loadSampleData();
            this.saveToStorage(); // Save sample data to localStorage
        }
    }

    /**
     * Save data to localStorage
     */
    saveToStorage() {
        const dataToSave = {
            users: this.users,
            nextId: this.nextId
        };
        localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
    }

    /**
     * Load existing sample data from the HTML table (fallback)
     */
    loadSampleData() {
        const existingRows = this.tableBody.querySelectorAll('tr');
        existingRows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 5) {
                const user = {
                    id: parseInt(cells[0].textContent),
                    name: cells[1].textContent,
                    age: parseInt(cells[2].textContent),
                    email: cells[3].textContent,
                    registrationDate: cells[4].textContent
                };
                this.users.push(user);
                this.nextId = Math.max(this.nextId, user.id + 1);
            }
        });
    }

    /**
     * Add a new user to the table
     * @param {Object} userData - User data (name, age, email)
     */
    addUser(userData) {
        const newUser = {
            id: this.nextId++,
            name: userData.name,
            age: userData.age,
            email: userData.email,
            registrationDate: this.getCurrentDate()
        };

        this.users.push(newUser);
        this.renderUser(newUser);
        this.saveToStorage(); // Save to localStorage
    }

    /**
     * Render all users in the table
     */
    renderAllUsers() {
        this.tableBody.innerHTML = '';
        this.users.forEach(user => {
            this.renderUser(user);
        });
    }

    /**
     * Render a user row in the table
     * @param {Object} user - User object to render
     */
    renderUser(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.registrationDate}</td>
        `;

        this.tableBody.appendChild(row);
    }

    /**
     * Clear all users and reload sample data
     */
    clearAllUsers() {
        this.users = [];
        this.nextId = 1;
        this.tableBody.innerHTML = '';
        this.loadSampleData();
        this.saveToStorage(); // Save to localStorage
        this.renderAllUsers();
    }

    /**
     * Refresh the table display
     */
    refreshTable() {
        this.renderAllUsers();
    }

    /**
     * Get total number of users
     * @returns {number} Number of users
     */
    getUserCount() {
        return this.users.length;
    }

    /**
     * Get current date in YYYY-MM-DD format
     * @returns {string} Current date
     */
    getCurrentDate() {
        const now = new Date();
        return now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0');
    }

    /**
     * Clear all data from localStorage (complete reset)
     */
    clearStorage() {
        localStorage.removeItem(this.storageKey);
        this.users = [];
        this.nextId = 1;
        this.loadSampleData();
        this.saveToStorage();
        this.renderAllUsers();
    }
}

/**
 * Initialize the user table when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    window.userTable = new UserTable();
});
