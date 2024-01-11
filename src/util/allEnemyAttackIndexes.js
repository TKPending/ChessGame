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
        if (enemy.getValidMoves.length !== 0) {  // TODO: Need to adjust this. Becareful of recursion
            if (enemy.getPieceName === "King") {
                enemyMoves.push(...enemy.kingPotentialMoves);
            } else {
                enemyMoves.push(...enemy.generateLegalMoves(chessBoard));

                if (enemy.getPieceName == "Pawn") {
                    const captureMoves = [enemy.captureRight(chessBoard), enemy.captureLeft(chessBoard)];
                    console.log(captureMoves)
                    enemyMoves.push(...captureMoves);
                }
            }

            if (enemy.defendingPieces.length !== 0) {
                enemyMoves.push(...enemyDefendingMoves(enemy));
            }
        }
    }

    return enemyMoves;
}