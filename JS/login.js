document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    // Password visibility toggle
    if (togglePassword) {
        togglePassword.addEventListener('change', () => {
            passwordInput.type = togglePassword.checked ? 'text' : 'password';
        });
    }

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();

        // Validate email and password
        if (!email || !password) {
            showMessage('Both fields are required!', true);
            return;
        }

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showMessage('Invalid email or password!', true);
            return;
        }

        showMessage(`Welcome back, ${user.name}! Redirecting...`, false);
        setTimeout(() => {
            window.location.href = 'profile.html'; // Redirect to profile page
        }, 1500);
    });

    // Show messages
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
