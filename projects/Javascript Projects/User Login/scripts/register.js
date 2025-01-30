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

let firstname = document.querySelector('#firstname');
let lastname = document.querySelector('#lastname');
let email = document.querySelector('#email');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
const registerButton = document.querySelector('#register-btn');

// Function to create a new user and save to localStorage
const createUser = () => {
    const newFirstname = firstname.value;
    const newLastname = lastname.value;
    const newEmail = email.value;
    const newUsername = username.value;
    const newPassword = password.value;
    let role = "user";

    // Check if the username already exists
    for (let user in users) {
        if (user === newUsername) {
            alert("That username is already in use.");
            return;
        }
    }

    // Create new user
    new User(newFirstname, newLastname, newEmail, newUsername, newPassword, role);
    
    // Save the updated users object to localStorage as a plain JSON string
    localStorage.setItem('users', JSON.stringify(users));

    // Optionally clear the form
    firstname.value = '';
    lastname.value = '';
    email.value = '';
    username.value = '';
    password.value = '';
    alert('New user added');
}

// Validation logic for form inputs (if needed)
const validationRules = {
    firstname: { regex: /^[A-Za-z]+([ -][A-Za-z]+)*$/, valid: false },
    lastname: { regex: /^[A-Za-z]+([ -][A-Za-z]+)*$/, valid: false },
    email: { regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, valid: false },
    username: { regex: /^[A-Za-z0-9_-]{3,16}$/, valid: false },
    password: { regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, valid: false }
};

document.querySelector('.registerForm').addEventListener('input', (e) => {
    if (validationRules[e.target.id].regex.test(e.target.value)) {
        e.target.previousElementSibling.querySelector('.asterisk').style.display = "none";
        validationRules[e.target.id].valid = true;
    } else {
        e.target.previousElementSibling.querySelector('.asterisk').style.display = "inline";
    }

    if (validationRules.firstname.valid && validationRules.lastname.valid && validationRules.email.valid
        && validationRules.username.valid && validationRules.password.valid) {
        registerButton.disabled = false;
    }
});

registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    createUser();
});
