class Statistics {
    /**
     * Initialize the statistics manager with DOM elements and counters
     * Sets up event listeners and prepares interaction tracking
     */
    constructor() {
        this.clearDataBtn = document.getElementById('clearDataBtn');
        this.refreshBtn = document.getElementById('refreshBtn');

        this.registerCounter = null;
        this.clearCounter = null;
        this.totalCounter = null;

        this.counters = {
            register: 0,
            clear: 0,
            total: 0
        };

        this.init();
    }

    /**
     * Initialize counter elements and event listeners
     */
    init() {
        this.setupCounterElements();
        this.setupEventListeners();
        this.updateDisplay();
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
     * Increment register counter
     */
    incrementRegister() {
        this.counters.register++;
        this.counters.total++;
        this.updateDisplay();
    }

    /**
     * Increment clear counter
     */
    incrementClear() {
        this.counters.clear++;
        this.counters.total++;
        this.updateDisplay();
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
}

/**
 * Initialize the statistics manager when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    window.statistics = new Statistics();
});
