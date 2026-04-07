const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const FILE = "users.json";

// Read users
const readUsers = () => {
    return JSON.parse(fs.readFileSync(FILE));
};

// Write users
const writeUsers = (data) => {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

// CREATE
app.post("/users", (req, res) => {
    const users = readUsers();
    users.push(req.body);
    writeUsers(users);
    res.json({ message: "User added" });
});

// READ
app.get("/users", (req, res) => {
    res.json(readUsers());
});

// UPDATE
app.put("/users/:username", (req, res) => {
    let users = readUsers();
    users = users.map(u =>
        u.username === req.params.username ? req.body : u
    );
    writeUsers(users);
    res.json({ message: "User updated" });
});

// DELETE
app.delete("/users/:username", (req, res) => {
    let users = readUsers();
    users = users.filter(u => u.username !== req.params.username);
    writeUsers(users);
    res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});