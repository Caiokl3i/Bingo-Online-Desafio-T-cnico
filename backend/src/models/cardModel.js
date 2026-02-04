import db from "../database/db.js";

// Camada de acesso a dados (Model) para Cartelas, gerenciando serialização de números em JSON.

// Gera uma nova cartela para um usuário em um jogo específico.
export async function createCard({ bingoId, userId, numbers }) {
  return db.run(
    `INSERT INTO cards (bingoId, userId, numbers, markedNumbers) VALUES (?, ?, ?, ?)`,
    [bingoId, userId, JSON.stringify(numbers), JSON.stringify([])]
  );
}

// Busca uma cartela ativa e converte os campos armazenados como JSON de volta para arrays.
export async function findByUserAndBingo(bingoId, userId) {
  const card = await db.get(
    "SELECT * FROM cards WHERE bingoId = ? AND userId = ?",
    [bingoId, userId]
  );
  
  if (!card) return null;
  
  // Parse dos dados serializados no banco
  card.numbers = JSON.parse(card.numbers);
  card.markedNumbers = JSON.parse(card.markedNumbers);
  return card;
}

// Atualiza a lista de números marcados de uma cartela no banco.
export async function updateMarkedNumbers(cardId, markedNumbers) {
  return db.run(
    "UPDATE cards SET markedNumbers = ? WHERE id = ?",
    [JSON.stringify(markedNumbers), cardId]
  );
}

// Recupera o histórico de partidas nas quais o usuário participou.
export async function getUserHistory(userId) {
  return db.all(
    `SELECT DISTINCT b.id, b.prize, b.status, b.winner 
     FROM cards c 
     JOIN bingos b ON c.bingoId = b.id 
     WHERE c.userId = ? 
     ORDER BY b.id DESC`,
    [userId]
  );
}