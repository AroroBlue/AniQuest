
//this file has: shared or general functionalities: navigation, search, and profile management.
// Wait for the DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    populateNavigationBar();
    initializeProfilePage();
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
 */
function initializeProfilePage() {
    const usernameSpan = document.getElementById('username');
    const logoutButton = document.getElementById('logout-button');

    if (usernameSpan && logoutButton) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'AniQuest.html'; // Redirect to home if not logged in
        } else {
            usernameSpan.textContent = currentUser.name; // Display user name
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('currentUser'); // Clear current user
                window.location.href = 'AniQuest.html'; // Redirect to home page
            });
        }
    }
}
/*
 * Show a message in a target div with error or success styling.
 * @param {string} message - The message to display.
 * @param {boolean} isError - True if it's an error message, false if success.
 * @param {HTMLElement} targetDiv - The div to display the message in.
 */
/**
function showMessage(message, isError, targetDiv) {
   targetDiv.textContent = message;
    targetDiv.className = isError ? 'error' : 'success';
}

/*
function saveUserLocally(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
}
    */
