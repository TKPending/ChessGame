import { enemyTeamPiecesGameManager } from "../functions/game_management/gameManagement.js";

const enemyDefendingMoves = (enemyPiece) => {
    const piecesDefended = enemyPiece.defendingPieces;
    const defendedPositions = [];

    for (const defendedPosition of piecesDefended) {
        defendedPositions.push(defendedPosition.getCurrentPosition);
    }

    return defendedPositions;
}

// TODO:
// - Add pawn potential captures as places king can't move into
// - Figure out why the enemy moves aren't rendering at the right time

export const allEnemyMoves = (currentTeamTurn, chessBoard) => {
    // Get enemy pieces
    const enemyPieces = enemyTeamPiecesGameManager(currentTeamTurn);
    const enemyMoves = [];

    for (const enemy of enemyPieces) {
        const pieceName = enemy.getPieceName;

        // Specific piece invalid moves
        if (pieceName === "Pawn") {
            enemyMoves.push(...enemy.storeCaptureMoves);
        } else if (pieceName === "King") {
            enemyMoves.push(...enemy.surroundingTiles);
        } else if (pieceName === "Queen") {
            enemyMoves.push(...enemy.allQueenMoves);
        }

        // General piece moves
        if (enemy.getValidMoves.length !== 0 && pieceName != "King" && enemy.getPieceName !== "Pawn") {  // TODO: Need to adjust this. Becareful of recursion
            enemyMoves.push(...enemy.generateLegalMoves(chessBoard));

        }

        // Pieces that being defended
        if (enemy.defendingPieces.length !== 0) {
            enemyMoves.push(...enemyDefendingMoves(enemy));
        }
    }

    return enemyMoves;
}