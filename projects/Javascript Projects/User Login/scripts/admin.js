let users = JSON.parse(localStorage.getItem('users')) || {} ;


const populateTable = () =>{
    for (let username in users){
        addUserToTable(users[username])
    }  
}

document.addEventListener('DOMContentLoaded', ()=>{
    populateTable();
});


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

const editUserPopup = document.querySelector('.editUserPopup');
const contrastLayer = document.querySelector('#contrastLayer');

const editUser = () => {
    username = editUserPopup.getAttribute('data-username');
    
    let firstName = document.querySelector('#editFirstname').value;
    let lastName = document.querySelector('#editLastname').value;
    let email = document.querySelector('#editEmail').value;
    let password = document.querySelector('#editPassword').value;
    
    users[username].firstname = firstName;
    users[username].lastname = lastName;
    users[username].email = email;
    users[username].password = password;
    localStorage.setItem(`users`, JSON.stringify(users))

    editUserPopup.style.visibilty = "hidden";
    contrastLayer.style.display = "none";
}

document.querySelector('#submitChanges').addEventListener(('click'), editUser);

document.querySelector('#closePopup').addEventListener(('click'), () =>{
    editUserPopup.style.display = "none";
    contrastLayer.style.display = "none";
});

document.querySelector('#userTable').addEventListener(('click'), (e) =>{
    if (e.target.innerHTML === "Log Out"){
        logOut(e);
    }
    
    if (e.target.innerHTML === "Delete"){
        deleteUser(e)
    }
    
    if (e.target.innerHTML === "Edit"){
        editUserPopup.style.display = 'flex';
        contrastLayer.style.display = "block";
        const userRow = e.target.closest('tr');
        const editUser = userRow.querySelector('.usernameCol').innerHTML;
        editUserPopup.setAttribute("data-username", editUser);

        document.querySelector('#editFirstname').value = users[editUser].firstname;
        document.querySelector('#editLastname').value = users[editUser].lastname;
        document.querySelector('#editEmail').value = users[editUser].email;
        document.querySelector('#editPassword').value = users[editUser].password;

    }
});


