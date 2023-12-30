import { BOARDMAX, MAXPIECES, pieceOrTile } from './checkmate.js';

// TODO: More efficient to global every enemy piece. Avoids looping over the chessboard again and again

const findEnemyPiece = (chessBoardTile, originalTeam) => {
    const piece = pieceOrTile(chessBoardTile);

    if (piece) {
        return piece.pieceTeam != originalTeam ? piece : undefined;
    }

    return undefined;
}

const enemyDefendingMoves = (enemyPiece) => {
    const piecesDefended = enemyPiece.defendingPieces;
    const defendedPositions = [];

    for (const defendedPosition of piecesDefended) {
        defendedPositions.push(defendedPosition.getCurrentPosition);
    }

    return defendedPositions;
}

const getEnemyMoves = (enemyPieces, chessBoard) => {
    const enemyMoves = [];

    for (const enemy of enemyPieces) {
        // TODO: Might have invalid moves
        // Check lengh of valid moves
        if (enemy.getValidMoves.length !== 0) {
            enemyMoves.push(...enemy.generateLegalMoves(chessBoard));

            // Check length of defending moves
            if (enemy.defendingPieces.length !== 0) {
                enemyMoves.push(...enemyDefendingMoves(enemy));
            }
        }   
    }

    return enemyMoves;
}

const enemyPotentialPositions = (originalTeam, chessBoard) => {
    let piecesFound = 0;
    const enemyPieces = [];

    for (let row = 0; row < BOARDMAX && piecesFound <= MAXPIECES; row++) {
        for (let col = 0; col < BOARDMAX; col++) {
            const enemyPiece = findEnemyPiece(chessBoard[row][col], originalTeam);
            if (enemyPiece) {
                enemyPieces.push(enemyPiece);
            }
        }
    }

    return getEnemyMoves(enemyPieces, chessBoard);
}

export const movingIntoCheck = (originalTeam, potentialMove, chessBoard) => {
    const enemyPotentialMoves = enemyPotentialPositions(originalTeam, chessBoard);

    return enemyPotentialMoves;
}