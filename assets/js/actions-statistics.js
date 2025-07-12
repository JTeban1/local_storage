class Statistics {
    /**
     * Initialize the statistics manager with DOM elements, counters, and localStorage
     * Sets up event listeners, loads persistent data, and prepares interaction tracking
     */
    constructor() {
        this.clearDataBtn = document.getElementById('clearDataBtn');
        this.refreshBtn = document.getElementById('refreshBtn');

        this.registerCounter = null;
        this.clearCounter = null;
        this.totalCounter = null;

        // Storage key for persistent counters
        this.storageKey = 'appStatistics';

        this.counters = {
            register: 0,
            clear: 0,
            total: 0
        };

        this.init();
    }

    /**
     * Initialize counter elements, event listeners, and load persistent data
     */
    init() {
        this.loadFromStorage();
        this.setupCounterElements();
        this.setupEventListeners();
        this.updateDisplay();
    }

    /**
     * Load counter data from localStorage
     */
    loadFromStorage() {
        const savedData = localStorage.getItem(this.storageKey);
        
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                this.counters = {
                    register: parsedData.register || 0,
                    clear: parsedData.clear || 0,
                    total: parsedData.total || 0
                };
            } catch (error) {
                console.warn('Failed to load statistics from localStorage:', error);
                // Keep default counters if parsing fails
            }
        }
    }

    /**
     * Save counter data to localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.counters));
        } catch (error) {
            console.warn('Failed to save statistics to localStorage:', error);
        }
    }

    /**
     * Find and set up counter display elements
     */
    setupCounterElements() {
        const notifications = document.querySelectorAll('.notification');

        notifications.forEach(notification => {
            const subtitle = notification.querySelector('.subtitle');
            const title = notification.querySelector('.title');

            if (subtitle && title) {
                const text = subtitle.textContent.trim().toLowerCase();
                switch (text) {
                    case 'register':
                        this.registerCounter = title;
                        break;
                    case 'clear':
                        this.clearCounter = title;
                        break;
                    case 'total interactions':
                        this.totalCounter = title;
                        break;
                }
            }
        });
    }

    /**
     * Set up event listeners for buttons
     */
    setupEventListeners() {
        this.clearDataBtn.addEventListener('click', () => {
            this.handleClearData();
        });

        this.refreshBtn.addEventListener('click', () => {
            this.handleRefresh();
        });
    }

    /**
     * Handle clear data button click
     */
    handleClearData() {
        if (confirm('Are you sure you want to clear all registered users data?')) {
            if (window.userTable) {
                window.userTable.clearAllUsers();
            }

            this.incrementClear();
            this.showMessage('All user data has been cleared.', 'warning');
        }
    }

    /**
     * Handle refresh button click
     */
    handleRefresh() {
        if (window.userTable) {
            window.userTable.refreshTable();
        }

        this.showMessage('Table refreshed successfully.', 'info');
        this.addButtonFeedback(this.refreshBtn);
    }

    /**
     * Increment register counter and save to localStorage
     */
    incrementRegister() {
        this.counters.register++;
        this.counters.total++;
        this.updateDisplay();
        this.saveToStorage();
    }

    /**
     * Increment clear counter and save to localStorage
     */
    incrementClear() {
        this.counters.clear++;
        this.counters.total++;
        this.updateDisplay();
        this.saveToStorage();
    }

    /**
     * Update counter displays
     */
    updateDisplay() {
        if (this.registerCounter) {
            this.registerCounter.textContent = this.counters.register;
        }
        if (this.clearCounter) {
            this.clearCounter.textContent = this.counters.clear;
        }
        if (this.totalCounter) {
            this.totalCounter.textContent = this.counters.total;
        }
    }

    /**
     * Show a message to the user
     * @param {string} message - Message to display
     * @param {string} type - Message type ('success', 'warning', 'info')
     */
    showMessage(message, type = 'success') {
        const notification = document.createElement('div');
        const className = type === 'success' ? 'is-success' :
            type === 'warning' ? 'is-warning' : 'is-info';
        notification.className = `notification ${className} is-light`;
        notification.innerHTML = `
            <button class="delete" onclick="this.parentElement.remove()"></button>
            ${message}
        `;

        const actionsCard = this.clearDataBtn.closest('.card');
        const cardContent = actionsCard.querySelector('.card-content');
        cardContent.insertBefore(notification, cardContent.firstChild);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    /**
     * Add visual feedback to button
     * @param {HTMLElement} button - Button element
     */
    addButtonFeedback(button) {
        button.classList.add('is-loading');

        setTimeout(() => {
            button.classList.remove('is-loading');
        }, 500);
    }

    /**
     * Reset all counters to zero and save to localStorage
     */
    resetCounters() {
        this.counters = {
            register: 0,
            clear: 0,
            total: 0
        };
        this.updateDisplay();
        this.saveToStorage();
    }

    /**
     * Get current statistics (useful for debugging or exporting)
     * @returns {Object} Current counter values
     */
    getStatistics() {
        return { ...this.counters };
    }

    /**
     * Clear statistics data from localStorage (complete reset)
     */
    clearStorage() {
        localStorage.removeItem(this.storageKey);
        this.resetCounters();
    }
}

/**
 * Initialize the statistics manager when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    window.statistics = new Statistics();
});
