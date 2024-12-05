
//this is for the signing up functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeSignupForm();
});

/**
 * Initialize the sign-up form functionality.
 */
function initializeSignupForm() {
    const form = document.getElementById('form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!name || !email || !password) {
            showMessage('All fields are required!', true, messageDiv);
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(u => u.email === email);

        if (userExists) {
            showMessage('This email is already registered. Please log in.', true, messageDiv);
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        showMessage('Sign-up successful! Redirecting...', false, messageDiv);
        setTimeout(() => window.location.href = 'profile.html', 1500);
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