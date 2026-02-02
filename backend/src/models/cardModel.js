import db from "../database/db.js";


export async function createCard({ bingoId, userId, numbers }) {
    return db.run(
        `INSERT INTO cards (bingo_id, user_id, numbers, marked_numbers)
       VALUES (?, ?, ?, ?)`,
        [
            bingoId,
            userId,
            JSON.stringify(numbers),
            JSON.stringify([])
        ]
    );
}

export async function findByBingo(bingoId) {
    const cards = await db.all(
        "SELECT * FROM cards WHERE bingo_id = ?",
        [bingoId]
    );

    return cards.map(card => ({
        ...card,
        numbers: JSON.parse(card.numbers),
        markedNumbers: JSON.parse(card.marked_numbers)
    }));
}
