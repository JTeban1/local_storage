# Registration Form Application

A web application for user registration with data persistence using localStorage. Built with HTML, CSS (Bulma framework), and vanilla JavaScript.

## 📋 Features

- **User Registration Form** with validation
- **Data Table Display** of registered users
- **Data Persistence** using localStorage
- **Interactive Statistics** tracking user actions
- **Responsive Design** with Bulma CSS framework
- **Real-time Validation** using custom Validator class
- **Action Buttons** for clearing and refreshing data

## 🚀 Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with Bulma framework
- **JavaScript ES6+** - Modern vanilla JavaScript with classes
- **LocalStorage API** - Client-side data persistence
- **Bulma CSS** - Modern CSS framework for responsive design
- **Font Awesome** - Icon library

## 📁 Project Structure

```
📦 Registration Form App
├── 📄 index.html                 # Main HTML file
├── 📄 README.md                  # Project documentation
└── 📁 assets/
    ├── 📁 css/
    │   └── 📄 style.css          # Custom CSS styles
    └── 📁 js/
        ├── 📄 registration-form.js    # Form handling & validation
        ├── 📄 user-table.js          # Table management & persistence
        └── 📄 actions-statistics.js  # Actions & statistics tracking
```

## 🔧 JavaScript Modules

### 1. **Registration Form Module** (`registration-form.js`)
- **Validator Class**: Validates form input data
  - `checkInt(number)` - Validates non-negative integers
  - `checkString(str)` - Validates non-empty strings
- **RegistrationForm Class**: Handles form submission and validation
  - Form data collection and validation
  - Integration with user table and statistics
  - Success/error message display

### 2. **User Table Module** (`user-table.js`)
- **UserTable Class**: Manages user data and table display
  - **Data Persistence**: Uses localStorage for data storage
  - **Sample Data**: Loads initial sample data if no saved data exists
  - **CRUD Operations**: Add, display, clear, and refresh user data
  - **Auto-incrementing IDs**: Manages unique user identification

### 3. **Actions & Statistics Module** (`actions-statistics.js`)
- **Statistics Class**: Tracks user interactions and manages action buttons
  - **Interaction Counters**: Register, Clear, and Total interactions
  - **Action Buttons**: Clear all data and refresh table functionality
  - **Visual Feedback**: Button animations and user notifications

## 💾 Data Persistence

The application uses **localStorage** to maintain data across browser sessions:

- **Storage Key**: `'registeredUsers'`
- **Data Structure**: 
  ```javascript
  {
    users: [...],      // Array of user objects
    nextId: number     // Next available ID
  }
  ```
- **Automatic Save**: Data is saved after every add/clear operation
- **Automatic Load**: Data is loaded when the page loads
- **Fallback System**: Uses sample data if no saved data exists

## 🎯 Key Features Explained

### Form Validation
- **Name**: Must be a non-empty string
- **Age**: Must be a non-negative integer between 1-120
- **Email**: Must follow valid email format
- **Real-time feedback** with success/error notifications

### Data Management
- **Add Users**: Form submission adds users to the table
- **Clear Data**: Resets table to sample data
- **Refresh Table**: Re-renders the current data
- **Persistent Storage**: Data survives browser restarts

### Statistics Tracking
- **Register Counter**: Tracks successful registrations
- **Clear Counter**: Tracks data clear operations
- **Total Interactions**: Sum of all interactions
- **Real-time Updates**: Counters update automatically

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No additional installations required

### Running the Application

1. **Clone or Download** the project files
2. **Open** `index.html` in a web browser
3. **Start using** the registration form immediately

### Usage Instructions

1. **Register a User**:
   - Fill out the registration form (Name, Age, Email)
   - Click "Register" button
   - User will be added to the table and saved to localStorage

2. **View Registered Users**:
   - All users are displayed in the "Registered Users" table
   - Data persists across browser sessions

3. **Manage Data**:
   - **Clear All Data**: Removes all users and resets to sample data
   - **Refresh Table**: Re-displays current data

4. **Track Statistics**:
   - View interaction counters in the "Actions & Statistics" section
   - Counters track Register, Clear, and Total interactions

## 📊 Data Flow

```
User Form Input → Validation → UserTable.addUser() → localStorage.save() → DOM Update → Statistics Update
```

## 🐛 Troubleshooting

### Common Issues

1. **Data Not Persisting**:
   - Check if localStorage is enabled in browser
   - Verify no browser extensions are blocking localStorage

2. **Form Not Submitting**:
   - Check browser console for JavaScript errors
   - Ensure all required fields are filled

3. **Styling Issues**:
   - Verify Bulma CSS is loading from CDN
   - Check custom CSS file path

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
