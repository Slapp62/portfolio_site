let users = JSON.parse(localStorage.getItem('users')) || {} ;
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
    let firstName = document.querySelector('#firstname').value;
    let lastName = document.querySelector('#lastname').value;
    let email = document.querySelector('#email').value;
    let newUsername = document.querySelector('#regUsername').value;
    let password = document.querySelector('#regPassword').value;
    let role = "user";

    for (let username in users){
        if (username === newUsername){
            alert("that username is already in use")
            return
        } 
    } 

    let newUser = new User(firstName, lastName, email, newUsername, password, role);
    addUserToTable(newUser);
}

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


