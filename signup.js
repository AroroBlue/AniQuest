
//this is for the signing up functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeSignupForm();
});
<syle>
    body {
        font-family: Arial, sans-serif;
        background-color: #f6aeaf;
        color: #333;
        margin: 0;
        padding: 0; /* Remove any extra padding */
        display: flex;
        justify-content: center; /* Horizontal centering */
        align-items: center; /* Vertical centering */
        height: 100vh; /* Make the body take up the full viewport height */
    }

    .form-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
    }

</syle>
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