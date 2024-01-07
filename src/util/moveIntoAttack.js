 import { allEnemyMoves } from "./allEnemyAttackIndexes.js";
 
 // Check if king move, will move king into check
 export const movingIntoAttackedPosition = (currentTeam, currentMoveIdea, chessBoard) => {
    const enemyMoves = allEnemyMoves(currentTeam, chessBoard);

    // Check if king potential move matches an enemy legal move
    for (const potentialMove of enemyMoves) {
        if (potentialMove[0] === currentMoveIdea[0] && potentialMove[1] === currentMoveIdea[1]) {
            // Will move into an attacked position
            return true;
        }
    }
    // Won't move into an attacked position
    return false;
}