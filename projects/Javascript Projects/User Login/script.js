let users = JSON.parse(localStorage.getItem('users')) || {} ;

class User {
    
    constructor(firstname, lastname, email, username, password){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.loggedIn = "Disconnected";

        users[username] = this;
        localStorage.setItem(`users`, JSON.stringify(users));
    }
}

const populateTable = () =>{
    for (let username in users){
        addUserToTable(users[username])
    }  
}

document.addEventListener('DOMContentLoaded', ()=>{
    populateTable();
});

const createUser = () => {
    let firstName = document.querySelector('#firstname').value;
    let lastName = document.querySelector('#lastname').value;
    let email = document.querySelector('#email').value;
    let newUsername = document.querySelector('#regUsername').value;
    let password = document.querySelector('#regPassword').value;

    for (let username in users){
        if (username === newUsername){
            alert("that username is already in use")
            return
        } 
    } 

    let newUser = new User(firstName, lastName, email, newUsername, password);
    addUserToTable(newUser);
}

const addUserToTable = (user) => {
        const newRow = `
            <tr data-username="${user.username}">
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td class="usernameCol">${user.username}</td>
                <td>${user.password}</td>
                <td class="login-state">${user.loggedIn}</td>
                <td><button class="form-button" id="logout-button">Log Out</button></td>
                <td><button class="form-button">Edit</button></td>
                <td><button class="form-button">Delete</button></td>
            </tr>
        `;

        document.querySelector('#userTable').insertAdjacentHTML('beforeend', newRow);
}

document.querySelector('#register').addEventListener('click', (e) => {
    e.preventDefault();
    createUser();
});

const logIn = () => {
    let loginUsername = document.querySelector('#loginUsername').value;
    let loginPassword = document.querySelector('#loginPassword').value;

    for (let username in users){
        if (username === loginUsername && users[username].password === loginPassword){
            if (users[username].loggedIn === "Connected"){
                alert('you are already logged in')
                return
            }
            users[username].loggedIn = "Connected"
            localStorage.setItem(`users`, JSON.stringify(users))
            const userRow = document.querySelector(`tr[data-username="${loginUsername}"]`);
            userRow.querySelector('.login-state').innerHTML = "Connected";
            return
        }
    }

    alert('the username or password is incorrect')
    
}

document.querySelector('#login').addEventListener(('click'), (e) =>{
    e.preventDefault();
    logIn();
});

const logOut = (e) =>{
    const userId = e.target.closest('tr');
    const logoutUser = userId.querySelector('.usernameCol').innerHTML;
    users[logoutUser].loggedIn = "Disconnected";
    userId.querySelector('.login-state').innerHTML = "Disconnected";
    localStorage.setItem(`users`, JSON.stringify(users))
}

const deleteUser = (e) => {
    const userId = e.target.closest('tr');
    userId.remove();

    const deleteUser = userId.querySelector('.usernameCol').innerHTML;
    delete users[deleteUser];
    localStorage.setItem(`users`, JSON.stringify(users))
}

const editUser = (e) => {

}

document.querySelector('#userTable').addEventListener(('click'), (e) =>{
    if (e.target.innerHTML === "Log Out"){
        logOut(e);
    }
    
    if (e.target.innerHTML === "Delete"){
        deleteUser(e)
    }
    
    if (e.target.innerHTML === "Edit"){
        editUser(e)
    }
});


