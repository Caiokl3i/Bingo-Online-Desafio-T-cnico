import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { profile, myProfileData } from '../controllers/profileController.js';

// Definição das rotas de perfil do usuário, protegidas por autenticação.

const router = express.Router();

// Rotas protegidas (requerem autenticação via token)
router.get('/', authMiddleware, profile);
router.get('/userProfile', authMiddleware, myProfileData);

export default router;