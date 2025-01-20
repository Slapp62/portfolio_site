class User {
    constructor(firstname, lastname, email, username, password){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

const createUser = () => {
    let userNum = parseInt(localStorage.getItem('usernume')) || 1;
    let firstName = document.querySelector("#firstname").value;
    let lastName = document.querySelector("#lastname").value;
    let email = document.querySelector("#email").value;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let newUser = new User(firstName, lastName, email, username, password);

    localStorage.setItem(`user${userNum}`, JSON.stringify(newUser));
    userNum++;

}

document.querySelector('#register').addEventListener('click', createUser);
