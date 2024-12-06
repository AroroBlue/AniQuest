//this is for the login fucntions etc etc

document.addEventListener('DOMContentLoaded', () => {
    initializeLoginForm();
});

/**
 * Initialize the login form functionality.
 */
function initializeLoginForm() {
    const form = document.getElementById('form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            showMessage('All fields are required!', true, messageDiv);
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMessage(`Welcome back, ${user.name}! Redirecting...`, false, messageDiv);
            setTimeout(() => window.location.href = 'profile.html', 1500);
        } else {
            showMessage('Invalid email or password. Please try again.', true, messageDiv);
        }
    });

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
