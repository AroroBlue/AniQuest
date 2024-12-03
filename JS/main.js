

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
    const form = document.getElementById('signup-form');
    const messageDiv = document.getElementById('message');

    if (form && messageDiv) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Get input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // Validate inputs
            if (!name || !email || !password) {
                showMessage('All fields are required!', true, messageDiv);
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                showMessage('Please enter a valid email address!', true, messageDiv);
                return;
            }

            if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
                showMessage('Password must include uppercase, number, and special character!', true, messageDiv);
                return;
            }

            // Simulate saving user data locally
            saveUserLocally(name, email, password);

            // Show success message and redirect
            showMessage('Sign-up successful! Welcome to AniQuest!', false, messageDiv);
            form.reset();
            setTimeout(() => {
                window.location.href = 'welcome.html'; // Redirect after showing the success message
            }, 1500);
            
            // Password visibility toggle
            if (togglePassword) {
                togglePassword.addEventListener('change', () => {
                    passwordInput.type = togglePassword.checked ? 'text' : 'password';
                });
            }

            // Function to display messages
            function showMessage(message, isError) {
                messageDiv.textContent = message;
                messageDiv.className = isError ? 'error' : 'message';

            if (isError) {
                setTimeout(() => {
                    messageDiv.textContent = '';
                    messageDiv.className = '';
                }, 3000);
        }
    }
});


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

