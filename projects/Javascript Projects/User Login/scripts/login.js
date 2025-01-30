import { User, users } from './app.js';

// Load users from localStorage without encryption
const storedUsers = localStorage.getItem('users');
if (storedUsers) {
    try {
        const parsedUsers = JSON.parse(storedUsers) || {};
        Object.assign(users, parsedUsers); // Merge parsed data with users
    } catch (e) {
        console.error('Error parsing stored users data:', e);
    }
}

const loginButton = document.querySelector('#login-btn');

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    logIn();
});

const logIn = () => {
    let loginUsername = document.querySelector('#username').value;
    let loginPassword = document.querySelector('#password').value;

    for (let username in users) {
        if (username === loginUsername && users[username].password === loginPassword) {
            if (users[username].role === "admin") {
                window.location.href = "./admin.html"; // Redirect to admin page
            }

            users[username].loggedIn = "Connected";
            window.location.href = "./accountPage.html";

            // Save updated users data back to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            return
        }
    }

    alert('The username or password is incorrect');
};
