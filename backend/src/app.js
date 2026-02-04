import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import bingoRoutes from './routes/bingoRoutes.js';

// Configuração principal da aplicação Express, middlewares globais e agrupamento de rotas.

const app = express();

// Middlewares globais (JSON parser e CORS)
app.use(express.json());
app.use(cors());

// Registro de rotas da aplicação
app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/bingos', bingoRoutes);

export default app;