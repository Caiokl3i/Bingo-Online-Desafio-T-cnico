// Utilitário que valida se a cartela venceu (Linha, Coluna ou Diagonais).
export const checkWin = (cardMatrix, markedNumbers) => {
  if (!cardMatrix || !markedNumbers) return { win: false };
  const size = 5;

  // 1. Verifica Linhas Horizontais
  for (let row = 0; row < size; row++) {
    if (cardMatrix[row].every(num => markedNumbers.includes(num))) {
      return { win: true, type: "Linha Horizontal" };
    }
  }

  // 2. Verifica Colunas Verticais
  for (let col = 0; col < size; col++) {
    // Verifica se todos os números da coluna atual estão marcados
    if (cardMatrix.every(row => markedNumbers.includes(row[col]))) {
       return { win: true, type: "Linha Vertical" };
    }
  }

  // 3. Verifica Diagonal Principal (Esquerda p/ Direita)
  if (cardMatrix.every((row, i) => markedNumbers.includes(row[i]))) {
    return { win: true, type: "Diagonal Principal" };
  }

  // 4. Verifica Diagonal Secundária (Direita p/ Esquerda)
  if (cardMatrix.every((row, i) => markedNumbers.includes(row[size - 1 - i]))) {
    return { win: true, type: "Diagonal Secundária" };
  }

  return { win: false };
};