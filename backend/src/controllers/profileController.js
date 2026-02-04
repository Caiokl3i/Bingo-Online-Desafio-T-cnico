import { getUserHistory } from "../models/cardModel.js";

// Retorna os dados básicos do usuário extraídos do token (validação de sessão).
export function profile(req, res) {
  res.json({
    message: 'Rota protegida',
    user: req.user
  });
}

// Retorna o perfil completo, segregando partidas ativas e histórico de jogos finalizados.
export async function myProfileData(req, res) {
  try {
    const historyData = await getUserHistory(req.user.id);

    // Separa jogos em andamento daqueles já encerrados
    const participating = historyData.filter(game => game.status !== 'finished');
    const history = historyData.filter(game => game.status === 'finished');

    // Processa o histórico para adicionar flag de vitória baseada no nome do vencedor
    const historyWithResult = history.map(game => ({
      ...game,
      won: game.winner === req.user.name
    }));

    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      participating,
      history: historyWithResult
    });

  } catch (error) {
    console.error("Erro no perfil:", error);
    res.status(500).json({ message: "Erro ao buscar perfil" });
  }
}