import { enemyTeamPiecesGameManager } from "../functions/game_management/gameManagement.js";

const enemyDefendingMoves = (enemyPiece) => {
    const piecesDefended = enemyPiece.defendingPieces;
    const defendedPositions = [];

    for (const defendedPosition of piecesDefended) {
        defendedPositions.push(defendedPosition.getCurrentPosition);
    }

    return defendedPositions;
}

export const allEnemyMoves = (currentTeamTurn, chessBoard) => {
    // Get enemy pieces
    const enemyPieces = enemyTeamPiecesGameManager(currentTeamTurn);
    const enemyMoves = [];

    for (const enemy of enemyPieces) {
        if (enemy.getValidMoves.length !== 0 && enemy.getPieceName != "King") {  // TODO: Need to adjust this. Becareful of recursion
            enemyMoves.push(...enemy.generateLegalMoves(chessBoard));

            if (enemy.defendingPieces.length !== 0) {
                enemyMoves.push(...enemyDefendingMoves(enemy));
            }
        }   
    }

    return enemyMoves;
}