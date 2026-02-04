import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findByEmail, findAll } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Controlador de autenticação: gerencia registro, login e emissão de tokens JWT.

// Registra um novo usuário no banco, garantindo que a senha seja salva criptografada.
export async function register(req, res) {
  const { name, email, password } = req.body;

  const userExists = await findByEmail(email);
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
}

// Autentica as credenciais, verifica a senha e gera o token de sessão (JWT).
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Define admin se o email bater com a variável de ambiente
  const isAdmin = user.email === ADMIN_EMAIL;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: isAdmin
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: isAdmin
    }
  });
}

// Lista todos os usuários da base (Geralmente restrito a admins via rotas).
export async function getAllUsers(req, res) {
  const users = await findAll();
  res.json(users);
}