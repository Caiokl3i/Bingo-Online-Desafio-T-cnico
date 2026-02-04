import db from "../database/db.js";

// Camada de acesso a dados (Model) para Bingos, gerenciando estado do jogo e números sorteados.

// Cria uma nova partida com status inicial 'waiting' e lista de sorteios vazia.
export async function createBingoModel({ prize }) {
  return db.run(
    `INSERT INTO bingos (prize, status, drawnNumbers, winner) VALUES (?, ?, ?, ?)`,
    [prize, "waiting", JSON.stringify([]), null]
  );
}

// Busca dados de uma partida e converte a lista de números sorteados (JSON) para Array.
export async function findById(id) {
  const bingo = await db.get("SELECT * FROM bingos WHERE id = ?", [id]);
  
  if (!bingo) return null;
  
  bingo.drawnNumbers = JSON.parse(bingo.drawnNumbers);
  return bingo;
}

// Atualiza o registro dos números já sorteados, serializando a lista para JSON.
export async function updateDrawnNumbers(id, numbers) {
  return db.run(
    "UPDATE bingos SET drawnNumbers = ? WHERE id = ?",
    [JSON.stringify(numbers), id]
  );
}

// Finaliza a partida, definindo o status como 'finished' e registrando o vencedor.
export async function setWinner(id, winnerName) {
  return db.run(
    "UPDATE bingos SET status = 'finished', winner = ? WHERE id = ?",
    [winnerName, id]
  );
}

// Remove permanentemente o registro de uma partida pelo ID.
export async function deleteBingo(id) {
  return db.run("DELETE FROM bingos WHERE id = ?", [id]);
}

// Retorna todas as partidas cadastradas, aplicando a desserialização dos números em cada uma.
export async function getAllBingos() {
  const bingos = await db.all("SELECT * FROM bingos");
  return bingos.map(b => ({ ...b, drawnNumbers: JSON.parse(b.drawnNumbers) }));
}