const MAXPIECES = 16;
const BOARDMAX = 8;

const enemyOrFriendly = (piece, originalTeam) => {
    return piece.pieceTeam != originalTeam ? piece : undefined;
}

const pieceOrTile = (chessBoardTile) => {
    return chessBoardTile.spaceOccupation;
}

const kingInCheck = (kingPiece, validEnemyMoves) => {
    const kingPosition = kingPiece.getCurrentPosition;

    for (const moves of validEnemyMoves) {
        if (moves[0] == kingPosition[0] && moves[1] == kingPosition[1]) {
            console.log(`The ${kingPiece.pieceTeam} is in check`);
                    return true;
        }
    }

    return false;
}

const kingFutureMoves = (kingPiece, validEnemyMoves) => {
    const kingPotentialMoves = kingPiece.getValidMoves;
    const kingMoveCount = kingPotentialMoves.length;
    let checkmateCount = 0;

    // Kings Moves
    for (const kingMoves of kingPotentialMoves) {
        // Enemy Moves
        for (const enemyMoves of validEnemyMoves) {
            if (enemyMoves[0] == kingMoves[0] && enemyMoves[1] == kingMoves[1]) {
                checkmateCount++;
            }
        }
    }

    if (checkmateCount == kingMoveCount) {
        console.log(`The ${kingPiece.pieceTeam} king is in checkmate`);
    }
}

const checkmate = (kingPiece, inCheckCheck, validEnemyMoves) => {
    if (inCheckCheck) {
        kingFutureMoves(kingPiece, validEnemyMoves);
    }
}

// Original Team = The next players turn
export const enemyThreats = (originalTeam, kingPiece, chessBoard) => {
    let piecesFound = 0;
    const validEnemyMoves = [];
    const originalKing = kingPiece[originalTeam];

    for (let row = 0; row < BOARDMAX && piecesFound < MAXPIECES; row++) {
        for (let col = 0; col < BOARDMAX; col++) {
            const piece = pieceOrTile(chessBoard[row][col]);

            if (piece) {
                const enemyPiece = enemyOrFriendly(piece, originalTeam);

                if (enemyPiece) {
                    piecesFound++;
                    validEnemyMoves.push(...enemyPiece.generateLegalMoves(chessBoard));
                }
            }
        }
    }

    const inCheckCheck = kingInCheck(originalKing, validEnemyMoves);

    checkmate(originalKing, inCheckCheck, validEnemyMoves);
}