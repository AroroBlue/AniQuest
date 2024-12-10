import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => {
    initializeSignupForm();
});

/**
 * Initialize the sign-up form functionality.
 */
function initializeSignupForm() {
    const form = document.getElementById('form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!name || !email || !password) {
            showMessage('All fields are required!', true, messageDiv);
            return;
        }

        try {
            // Firebase Authentication: Create a new user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update user profile with the name
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            showMessage('Sign-up successful! Redirecting...', false, messageDiv);

            // Redirect to profile page after a delay
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        } catch (error) {
            // Handle Firebase errors
            console.error("Error during sign-up:", error.message);
            showMessage(error.message, true, messageDiv);
        }
    });

    /**
     * Display a message to the user.
     * @param {string} text - The message text.
     * @param {boolean} isError - Whether the message is an error.
     * @param {HTMLElement} target - The message div.
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
