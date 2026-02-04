import db from "../database/db.js";

// Camada de acesso a dados (Model) para operações na tabela de usuários.

// Cria um novo registro de usuário no banco de dados.
export async function createUser({ name, email, password, isAdmin = false }) {
  return db.run(
    `INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)`,
    [name, email, password, isAdmin]
  );
}

// Busca dados completos de um usuário pelo e-mail (login).
export async function findByEmail(email) {
  return db.get("SELECT * FROM users WHERE email = ?", [email]);
}

// Busca dados completos de um usuário pelo ID único.
export async function findById(id) {
  return db.get("SELECT * FROM users WHERE id = ?", [id]);
}

// Retorna uma lista com todos os usuários cadastrados (apenas dados públicos).
export async function findAll() {
  return db.all("SELECT id, name, email, isAdmin FROM users");
}