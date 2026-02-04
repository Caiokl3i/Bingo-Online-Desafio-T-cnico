import express from 'express';
import { check } from '../controllers/healthController.js';

// Rota de verificação de status da API (Health Check) para monitoramento.

const router = express.Router();

router.get('/', check);

export default router;