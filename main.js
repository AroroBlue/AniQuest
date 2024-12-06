// Wait for the DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    populateNavigationBar();
    initializeProfilePage();
    initializeLoginPage();
});

/**
 * Initialize search functionality for the animal cards.
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
 * Initialize the profile page functionality.
 * Displays the logged-in user's name and sets up log-out.
 */
function initializeProfilePage() {
    const usernameSpan = document.getElementById('username');
    const logoutButton = document.getElementById('logout-button');
    const profileDetails = document.getElementById('profile-details');
    const editProfileButton = document.getElementById('edit-profile-btn');

    if (usernameSpan && logoutButton) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'AniQuest.html'; // Redirect to home if not logged in
        } else {
            usernameSpan.textContent = currentUser.name; // Display user name

            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('currentUser'); // Clear current user
                alert("You have been logged out.");
                window.location.href = 'AniQuest.html'; // Redirect to home page
            });

            // Edit Profile Button Logic
            if (editProfileButton) {
                editProfileButton.addEventListener('click', () => {
                    profileDetails.style.display =
                        profileDetails.style.display === 'none' ? 'block' : 'none';
                });
            }
        }
    }
}

/**
 * Initialize the login page functionality.
 * Redirects the user to the profile page upon successful login.
 */
function initializeLoginPage() {
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (loginButton && usernameInput && passwordInput) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Example validation: Replace this with your actual backend authentication
            if (username === 'testuser' && password === 'password123') {
                const currentUser = { name: username };
                localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Save user to localStorage

                alert("Login successful!");
                window.location.href = 'profile.html'; // Redirect to profile page
            } else {
                alert("Invalid username or password. Please try again.");
            }
        });
    }
}
