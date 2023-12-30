export const MAXPIECES = 16;
export const BOARDMAX = 8;

export const enemyOrFriendly = (piece, originalTeam) => {
    return piece.pieceTeam != originalTeam ? piece : undefined;
}

export const pieceOrTile = (chessBoardTile) => {
    return chessBoardTile.spaceOccupation;
}

const kingInCheck = (kingPiece, validEnemyMoves) => {
    const kingPosition = kingPiece.getCurrentPosition;

    for (const moves of validEnemyMoves) {
        if (moves[0] == kingPosition[0] && moves[1] == kingPosition[1]) {
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

    // TODO Remove Duplicates
    return checkmateCount >= kingMoveCount ? true : false;
}

const kingInCheckmate = (kingPiece, inCheckCheck, validEnemyMoves, originalTeam, chessBoard) => {
    if (inCheckCheck) {
        // const moveIntoCheck = checkTestRun(kingPiece, originalTeam, kingPiece.getValidMoves, chessBoard);
        kingPiece.simulateFutureMoves(chessBoard);
        const checkmateMoves = kingFutureMoves(kingPiece, validEnemyMoves);

        return checkmateMoves ? true : false;
    }
}

// Original Team = The next players turn
const enemyThreats = (originalTeam, kingPiece, chessBoard) => {
    let piecesFound = 0;
    const validEnemyMoves = [];
    const originalKing = kingPiece[originalTeam];

    for (let row = 0; row < BOARDMAX && piecesFound < MAXPIECES; row++) {
        for (let col = 0; col < BOARDMAX; col++) {
            const piece = pieceOrTile(chessBoard[row][col]);

            if (piece) {
                const enemyPiece = enemyOrFriendly(piece, originalKing);

                if (enemyPiece) {
                    piecesFound++;
                    validEnemyMoves.push(...enemyPiece.generateLegalMoves(chessBoard));
                }
            }
        }
    }

    originalKing.generateLegalMoves(chessBoard);

    const inCheckCheck = kingInCheck(originalKing, validEnemyMoves);
    const checkmateCheck = kingInCheckmate(originalKing, inCheckCheck, validEnemyMoves, originalTeam, chessBoard);

    return {
        "check": inCheckCheck || null,
        "checkmate": checkmateCheck || null
    }
}

export const checkmate = (originalTeam, kingPiece, chessBoard) => {
    const checkmateStatus = enemyThreats(originalTeam, kingPiece, chessBoard);
    const originalKing = kingPiece[originalTeam];

    console.log(checkmateStatus)

    if (checkmateStatus["check"] && checkmateStatus["checkmate"]) {
        console.log(`The ${originalKing.pieceTeam} king is in CHECKMATE`);
    } else if (checkmateStatus["check"]) {
        console.log(`The ${originalKing.pieceTeam} king is in CHECK`);
    }
}