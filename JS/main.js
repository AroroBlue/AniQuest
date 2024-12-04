

// Wait for the DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize functionalities
    initializeSignupForm();
    initializeSearch();
    populateNavigationBar();
});

/**
 * Initialize the sign-up form functionality.
 * Validates inputs, shows messages, and simulates form submission.
 */
function initializeSignupForm() {
    const form = document.getElementById('form');
    const formTitle = document.getElementById('form-title');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const signupFields = document.getElementById('signup-fields');
    const switchToLogin = document.getElementById('switch-to-login');
    const switchToSignup = document.getElementById('switch-to-signup');
    const messageDiv = document.getElementById('message');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');

    let isLoginMode = false;

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showMessage('All fields are required!', true, messageDiv);
            return;
        }

        if (isLoginMode) {
            handleLogin(email, password);
        } else {
            const name = document.getElementById('name').value.trim();
            if (!name) {
                showMessage('Name is required for sign-up!', true, messageDiv);
                return;
            }
            handleSignUp(name, email, password);
        }
    });

    // Toggle password visibility
    togglePassword.addEventListener('change', () => {
        passwordInput.type = togglePassword.checked ? 'text' : 'password';
    });

    // Switch to login mode
    switchToLogin.addEventListener('click', () => {
        isLoginMode = true;
        formTitle.textContent = 'Log In';
        formSubmitBtn.textContent = 'Log In';
        signupFields.style.display = 'none';
        switchToLogin.style.display = 'none';
        switchToSignup.style.display = 'block';
        messageDiv.textContent = '';
    });

    // Switch to sign-up mode
    switchToSignup.addEventListener('click', () => {
        isLoginMode = false;
        formTitle.textContent = 'Sign Up';
        formSubmitBtn.textContent = 'Sign Up';
        signupFields.style.display = 'block';
        switchToLogin.style.display = 'block';
        switchToSignup.style.display = 'none';
        messageDiv.textContent = '';
    });

    /**
     * Handles user login.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     */
    function handleLogin(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            showMessage(`Welcome back, ${user.name}! Redirecting...`, false, messageDiv);
            setTimeout(() => window.location.href = 'profile.html', 1500);
        } else {
            showMessage('Invalid email or password. Please try again.', true, messageDiv);
        }
    }

    /**
     * Handles user sign-up.
     * @param {string} name - User's name.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     */
    function handleSignUp(name, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(u => u.email === email);

        if (userExists) {
            showMessage('This email is already registered. Please log in.', true, messageDiv);
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Sign-up successful! Redirecting...', false, messageDiv);
        setTimeout(() => window.location.href = 'profile.html', 1500);
    }

    /**
     * Displays a message in the message div.
     * @param {string} text - The message text.
     * @param {boolean} isError - True if the message is an error, false otherwise.
     * @param {HTMLElement} target - The message display element.
     */
    function showMessage(text, isError, target) {
        target.textContent = text;
        target.className = isError ? 'error' : 'success';

        if (isError) {
            setTimeout(() => {
                target.textContent = '';
                target.className = '';
            }, 3000);
        }
    }
}

/**
 * Initialize search functionality for the animal cards.
 * Filters animal cards based on user input.
 */
function initializeSearch() {
    const searchButton = document.querySelector('#search-btn');
    const searchInput = document.querySelector('#search');
    const cards = document.querySelectorAll('.animal-card');

    if (searchButton && searchInput && cards.length) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            let found = false;

            cards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (name.includes(query) || description.includes(query)) {
                    card.style.display = 'block';
                    found = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show an alert if no cards match the query
            if (!found) {
                alert('No results found for your search.');
            }
        });
    }
}

/**
 * Dynamically populate the navigation bar for consistency across pages.
 */
function populateNavigationBar() {
    const navLinks = [
        { text: 'Home', href: 'AniQuest.html' },
        { text: 'About', href: 'about.html' },
        { text: 'Services', href: 'services.html' },
        { text: 'Contact', href: 'contact.html' }
    ];

    const toolbar = document.querySelector('.toolbar');
    if (toolbar) {
        toolbar.innerHTML = navLinks
            .map(link => `<a href="${link.href}">${link.text}</a>`)
            .join('');
    }
}

/**
 * Show a message in a target div with error or success styling.
 * @param {string} message - The message to display.
 * @param {boolean} isError - True if it's an error message, false if success.
 * @param {HTMLElement} targetDiv - The div to display the message in.
 */
function showMessage(message, isError, targetDiv) {
    targetDiv.textContent = message;
    targetDiv.className = isError ? 'error' : 'success';
}

/**
 * Save user data locally in the browser's localStorage.
 * @param {string} name - User's name.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 */
function saveUserLocally(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
}

