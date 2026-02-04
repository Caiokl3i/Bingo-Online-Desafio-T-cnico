import { createBingoModel, findById, updateDrawnNumbers, setWinner, deleteBingo, getAllBingos } from "../models/bingoModel.js";
import { createCard, findByUserAndBingo, updateMarkedNumbers } from "../models/cardModel.js";

// Controlador principal da lógica de jogo: gestão de partidas, sorteios, participação e cartelas.

// Cria uma nova partida no sistema.
export const createBingo = async (req, res) => {
    const { prize } = req.body;
    await createBingoModel({ prize });
    res.status(201).json({ message: "Bingo criado com sucesso" });
};

// Registra o jogador na partida, gerando uma nova cartela ou recuperando a existente.
export async function joinBingo(req, res) {
    const bingoId = Number(req.params.id);
    const userId = req.user.id;

    const bingo = await findById(bingoId);
    if (!bingo) return res.status(404).json({ message: "Bingo não encontrado" });

    let card = await findByUserAndBingo(bingoId, userId);

    if (!card) {
        // Se não existir, gera os números e cria o registro
        const numbers = generateCard();
        await createCard({ bingoId, userId, numbers });
        
        // Recupera a cartela recém-criada para retornar o objeto completo
        card = await findByUserAndBingo(bingoId, userId);
    }

    res.json({ message: "Sucesso", card });
}

// Realiza o sorteio de um número aleatório (1-75), garantindo que não seja repetido.
export async function drawNumber(req, res) {
    const bingoId = Number(req.params.id);
    const bingo = await findById(bingoId);

    if (!bingo) return res.status(404).json({ message: "Bingo não encontrado" });
    if (bingo.status === "finished") return res.status(400).json({ message: "Bingo encerrado" });

    // Filtra números disponíveis (1 a 75 menos os já sorteados)
    const available = Array.from({ length: 75 }, (_, i) => i + 1).filter(n => !bingo.drawnNumbers.includes(n));
    
    if (available.length === 0) return res.json({ message: "Todos os números já foram sorteados" });

    const drawn = available[Math.floor(Math.random() * available.length)];
    await updateDrawnNumbers(bingoId, [...bingo.drawnNumbers, drawn]);

    res.json({ number: drawn });
}

// Marca um número na cartela do usuário, persistindo a alteração.
export async function markNumber(req, res) {
    const bingoId = Number(req.params.id);
    const { number } = req.body;
    const userId = req.user.id;

    const card = await findByUserAndBingo(bingoId, userId);
    if (!card) return res.status(404).json({ message: "Cartela não encontrada" });

    if (!card.markedNumbers.includes(number)) {
        card.markedNumbers.push(number);
        await updateMarkedNumbers(card.id, card.markedNumbers);
    }

    res.json(card);
}

// Exclui uma partida do banco de dados (Ação administrativa).
export async function deleteBingoController(req, res) {
    const { id } = req.params;
    await deleteBingo(id);
    res.json({ message: "Bingo deletado com sucesso" });
}

// Lista todas as partidas cadastradas e seus estados.
export async function getBingos(req, res) {
    const bingos = await getAllBingos();
    res.json(bingos);
}

// Finaliza a partida e define o vencedor oficial.
export async function finishBingo(req, res) {
    const { id } = req.params;
    const { winner } = req.body;

    try {
        if (!winner) return res.status(400).json({ message: "Nome do vencedor é obrigatório" });

        await setWinner(id, winner);
        res.json({ message: "Bingo finalizado!", winner });
    } catch (error) {
        console.error("Erro no finishBingo:", error);
        res.status(500).json({ message: "Erro ao finalizar bingo" });
    }
}

// Helper: Gera uma matriz 5x5 com números aleatórios únicos.
function generateCard() {
    const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
    
    // Algoritmo de Fisher-Yates para embaralhar
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    const selected = numbers.slice(0, 25);
    const matrix = [];
    while (selected.length) matrix.push(selected.splice(0, 5));
    
    return matrix;
}