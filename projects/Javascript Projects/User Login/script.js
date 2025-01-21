
class User {
    
    constructor(firstname, lastname, email, username, password){
        let id = parseInt(localStorage.getItem('ID')) || 1;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.id = id;
        this.loggedIn = "Disconnected";

        localStorage.setItem(`${id}`, JSON.stringify(this));
        localStorage.setItem('ID', id + 1);
    }
}

const populateTable = () =>{
    const numOfUsers = parseInt(localStorage.getItem('ID')) - 1;
    for (i = 1; i <= numOfUsers; i++){
        let user = JSON.parse(localStorage.getItem(i));
        addUserToTable(user);
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    populateTable();
});

const createUser = () => {
    let firstName = document.querySelector('#firstname').value;
    let lastName = document.querySelector('#lastname').value;
    let email = document.querySelector('#email').value;
    let username = document.querySelector('#regUsername').value;
    let password = document.querySelector('#regPassword').value;

    let newUser = new User(firstName, lastName, email, username, password);
    
    addUserToTable(newUser);
}

const addUserToTable = (user) => {
        const newRow = `
            <tr>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td class="login-state">${user.loggedIn}</td>
                <td><button class="form-button" id="logout-button" data-id="${user.id}">Log Out</button></td>
                <td><button class="form-button" data-id="${user.id}">Edit</button></td>
                <td><button class="form-button" data-id="${user.id}">Delete</button></td>
            </tr>
        `;

        document.querySelector('#userTable').insertAdjacentHTML('beforeend', newRow);
}

document.querySelector('#register').addEventListener('click', (e) => {
    e.preventDefault();
    createUser();
});

const logIn = () => {
    let username = document.querySelector('#loginUsername').value;
    let password = document.querySelector('#loginPassword').value;

    const numOfUsers = parseInt(localStorage.getItem('ID')) - 1;
    for (i = 1; i <= numOfUsers; i++){
        let user = JSON.parse(localStorage.getItem(i));
        if (user.username === username && user.password === password){
            user.loggedIn = "Connected";
            loginState = "Connected"
            localStorage.setItem(user.id, JSON.stringify(user));
            document.querySelector(".login-state").innerHTML = "Connected"
        }
    }
}

document.querySelector('#login').addEventListener(('click'), (e) =>{
    e.preventDefault();
    logIn();
});

const logOut = (e) =>{
    const userId = e.target.dataset.id;
    const numOfUsers = parseInt(localStorage.getItem('ID')) - 1;
    for (i = 1; i <= numOfUsers; i++){
        let user = JSON.parse(localStorage.getItem(i));
        if (parseInt(userId) === user.id){
            user.loggedIn = "Disconnected";
            localStorage.setItem(user.id, JSON.stringify(user));
            document.querySelector('.login-state').innerHTML = "Disconnected";
        }
    }
}

const deleteUser = (e) => {
    const userId = e.target.dataset.id;
    const numOfUsers = parseInt(localStorage.getItem('ID')) - 1;
    for (i = 1; i <= numOfUsers; i++){
        let user = JSON.parse(localStorage.getItem(i));
        if (parseInt(userId) === user.id){
            localStorage.removeItem(user.id);
            populateTable();
        }
    }
    console.log(e);
    
}

document.querySelector('#userTable').addEventListener(('click'), (e) =>{
    logOut(e);
    deleteUser(e);
});


