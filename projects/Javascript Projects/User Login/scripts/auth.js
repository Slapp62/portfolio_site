let users = JSON.parse(localStorage.getItem('users')) || {} ;
let firstname = document.querySelector('#firstname');
let lastname = document.querySelector('#lastname');
let email = document.querySelector('#email');
let username = document.querySelector('#regUsername');
let password = document.querySelector('#regPassword');
const registerButton = document.querySelector('#register');
const loginButton = document.querySelector('#login');

class User {
    static admin = new User("Simcha", "Lapp", "admin@admin.com", "admin", "admin", "admin");
    
    constructor(firstname, lastname, email, username, password, role){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.loggedIn = "Disconnected";
        this.role = role;

        users[username] = this;
        localStorage.setItem(`users`, JSON.stringify(users));
    }

    
}


const createUser = () => {
    const newFirstname = firstname.value;
    const newLastname = lastname.value;
    const newEmail = email.value;
    const newUsername = username.value;
    const newPassword = password.value;
    let role = "user";

    for (let username in users){
        if (username === newUsername){
            alert("that username is already in use")
            return
        } 
    } 

    let newUser = new User(newFirstname, newLastname, newEmail, newUsername, newPassword, role);
    addUserToTable(newUser);
}

const validationRules = {
    firstname: {
        regex: /^[A-Za-z]+([ -][A-Za-z]+)*$/,
        valid: false,
    },
    lastname: {
        regex: /^[A-Za-z]+([ -][A-Za-z]+)*$/,
        valid: false,
    },
    email: {
        regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        valid: false,
    },
    regUsername: {
        regex: /^[A-Za-z0-9_-]{3,16}$/,
        valid: false,
    },
    regPassword: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        valid: false,
    }
};

document.querySelector('.form').addEventListener('input', (e) => {
    if (validationRules[e.target.id].regex.test(e.target.value)){
        e.target.previousElementSibling.querySelector('.asterisk').style.display = "none";
        validationRules[e.target.id].valid = true;
    } else {
        e.target.previousElementSibling.querySelector('.asterisk').style.display = "inline";
    }

    
            if (validationRules.firstname.valid 
            && validationRules.lastname.valid 
            && validationRules.email.valid 
            && validationRules.regUsername.valid
            && validationRules.regPassword.valid){
                registerButton.disabled = false 
            }
});

if (registerButton){
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        createUser();
    });
}

if (loginButton){
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        logIn();
    });
}

const logIn = () => {
    let loginUsername = document.querySelector('#loginUsername').value;
    let loginPassword = document.querySelector('#loginPassword').value;

    for (let username in users){
        if (username === loginUsername && users[username].password === loginPassword){
            if (users[username].loggedIn === "Connected"){
                alert('you are already logged in')
                return
            }

            if (users[username].role === "admin"){
                document.getElementById("manageUsers").style.display = "block";
            }

            alert('you are now logged in');
            users[username].loggedIn = "Connected";
            localStorage.setItem(`users`, JSON.stringify(users))
            const userRow = document.querySelector(`tr[data-username="${loginUsername}"]`);
            userRow.querySelector('.login-state').innerHTML = "Connected";
            return
        }
    }

    alert('the username or password is incorrect')
    
}


