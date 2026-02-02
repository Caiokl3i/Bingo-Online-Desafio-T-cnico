import db from "../database/db.js";

export async function createUser({ name, email, password, isAdmin = false }) {
    return db.run(
        `INSERT INTO users (name, email, password, isAdmin)
       VALUES (?, ?, ?, ?)`,
        [name, email, password, isAdmin]
    );
}

export async function findByEmail(email) {
    return db.get(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
}

export async function findById(id) {
    return db.get(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );
}

export async function findAll() {
    return db.all("SELECT id, name, email, isAdmin FROM users");
}
