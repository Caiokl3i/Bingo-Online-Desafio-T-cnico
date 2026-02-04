import express from 'express';
import { register, login, getAllUsers } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Rotas públicas de autenticação e área administrativa de usuários.
router.post('/register', register);
router.post('/login', login);

router.get('/users', authMiddleware, adminOnly, getAllUsers);

export default router;