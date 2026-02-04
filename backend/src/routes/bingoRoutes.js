import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { createBingo, joinBingo, drawNumber, markNumber, deleteBingoController, getBingos, finishBingo } from "../controllers/bingoController.js";

// Rotas de gerenciamento do jogo, segregando ações administrativas e de jogadores.

const router = Router();

// Rotas Administrativas (Gestão de Salas e Sorteio)
router.post("/create", authMiddleware, adminOnly, createBingo);
router.delete("/:id", authMiddleware, adminOnly, deleteBingoController);
router.post("/:id/draw", authMiddleware, adminOnly, drawNumber);

// Rotas de Jogadores (Participação e Listagem)
router.get("/", authMiddleware, getBingos);
router.post("/:id/join", authMiddleware, joinBingo);
router.post("/:id/mark", authMiddleware, markNumber);
router.patch("/:id/finish", authMiddleware, finishBingo);

export default router;