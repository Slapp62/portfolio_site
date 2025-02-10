
class User {
    constructor(firstname, lastname, email, username, password, role){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.loggedIn = "Disconnected";
        this.role = role;

        users[username] = this;

        localStorage.setItem('users', JSON.stringify(users));

            
    }
}

let users = {};

const storedUsers = localStorage.getItem('users');
if (storedUsers){
    Object.assign(users, JSON.parse(storedUsers));
}

if (!users['admin']){
    users['admin'] = new User("Simcha", "Lapp", "admin@admin.com", "admin", "admin", "admin");
}

export {User, users}