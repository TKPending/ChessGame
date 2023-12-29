const MAXPIECES = 16;
const BOARDMAX = 8;

const enemyOrFriendly = (piece, originalTeam) => {
    return piece.pieceTeam != originalTeam ? piece : null;
}

const pieceOrTile = (chessBoardTile) => {
    return chessBoardTile.spaceOccupation;
}

const generateEnemyValidMoves = (enemyPiece, chessBoard) => {
    return enemyPiece.generateLegalMoves(chessBoard);
}

const kingInCheck = (kingPiece, validEnemyMoves) => {
    for (const eachPiece of validEnemyMoves) {
        if (eachPiece.length !== 0) {
            for (const moves of eachPiece) {
                
            }
        }
    }
}

// Original Team = The next players turn
export const enemyThreats = (originalTeam, kingPiece, chessBoard) => {
    let piecesFound = 0;
    const validEnemyMoves = [];

    for (let row = 0; row < BOARDMAX && piecesFound < MAXPIECES; row++) {
        for (let col = 0; col < BOARDMAX; col++) {
            const piece = pieceOrTile(chessBoard[row][col]);

            if (piece) {
                const enemyPiece = enemyOrFriendly(piece, originalTeam);

                if (enemyPiece) {
                    piecesFound++;
                    validEnemyMoves.push(generateEnemyValidMoves(enemyPiece, chessBoard));

                    kingInCheck(kingPiece[originalTeam], validEnemyMoves);
                }
            }
        }
    }
}