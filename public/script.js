const API = "http://localhost:3000/users";

function getInput() {
    return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };
}

// CREATE
function createUser() {
    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getInput())
    }).then(() => alert("User Added"));
}

// READ
function getUsers() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("userList");
            list.innerHTML = "";
            data.forEach(user => {
                const li = document.createElement("li");
                li.textContent = user.username + " - " + user.password;
                list.appendChild(li);
            });
        });
}

// UPDATE
function updateUser() {
    const user = getInput();
    fetch(`${API}/${user.username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then(() => alert("User Updated"));
}

// DELETE
function deleteUser() {
    const user = getInput();
    fetch(`${API}/${user.username}`, {
        method: "DELETE"
    }).then(() => alert("User Deleted"));
}