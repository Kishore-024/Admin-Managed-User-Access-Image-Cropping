const adminCredentials = { username: "admin", password: "admin123" };
const users = [];

function isAdmin(username, password) {
    return username === adminCredentials.username && password === adminCredentials.password;
}

function login(username, password) {
    if (isAdmin(username, password)) {
        showAdminInterface();
    } else {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            showUserInterface(user);
        } else {
            alert("Invalid credentials");
        }
    }
}

function showAdminInterface() {
    document.getElementById("admin-interface").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
    displayUserCredentials();
}

function showUserInterface(user) {
    document.getElementById("user-interface").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("user-id").innerText = user.id;
    document.getElementById("user-name").innerText = user.name;
    document.getElementById("user-photo").src = user.photo;
    document.getElementById("approval-status").innerText = user.approvalStatus;
    document.getElementById("view-details-btn").disabled = user.approvalStatus !== "Accepted by Admin";
}

function displayUserCredentials() {
    const userTable = document.getElementById("user-table");
    userTable.innerHTML = "";

    users.forEach(user => {
        const row = userTable.insertRow();
        row.insertCell(0).innerText = user.id;
        row.insertCell(1).innerText = user.name;
        const photoCell = row.insertCell(2);
        const img = document.createElement("img");
        img.src = user.photo;
        img.alt = "User Photo";
        photoCell.appendChild(img);
        const actionsCell = row.insertCell(3);
        actionsCell.appendChild(createDeleteButton(user.id));
    });
}

function createDeleteButton(userId) {
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.addEventListener("click", () => deleteUser(userId));
    return button;
}

function createUser() {
    const newUserId = users.length + 1;
    const newUser = {
        id: newUserId,
        name: "-",
        photo: "default-photo.jpg",
        approvalStatus: "Not Accepted by Admin"
    };
    users.push(newUser);
    displayUserCredentials();
}

function deleteUser(userId) {
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        displayUserCredentials();
    }
}

function viewUserDetails() {
    const userId = document.getElementById("user-id").innerText;
    const user = users.find(u => u.id == userId);

    if (user) {
        alert(`User Details:\nID: ${user.id}\nName: ${user.name}\nPhoto: ${user.photo}`);
    } else {
        alert("User details not found.");
    }
}

function approveUser() {
    const userId = document.getElementById("user-id").innerText;
    const user = users.find(u => u.id == userId);

    if (user) {
        user.approvalStatus = "Accepted by Admin";
        document.getElementById("approval-status").innerText = user.approvalStatus;
        document.getElementById("view-details-btn").disabled = false;
        alert("User approved successfully!");
    } else {
        alert("User not found.");
    }
}

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
});

document.getElementById("create-user-form").addEventListener("submit", function (e) {
    e.preventDefault();
    createUser();
});

document.getElementById("view-details-btn").addEventListener("click", function () {
    viewUserDetails();
});

document.getElementById("approval-btn").addEventListener("click", function () {
    approveUser();
});
