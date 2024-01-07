import { allEnemyMoves } from "../../util/allEnemyAttackIndexes.js";
import { positionToIndex } from "../../util/pieceTileLocation.js";

// Return rook piece
const getRookPiece = (chessBoard, side, team) => {
    const row = team === "white" ? 7 : 0;
    const col = side === "left" ? 0 : 7;

    const rookPiece = chessBoard[row][col].spaceOccupation;
 
    return rookPiece;
};

// Checks if any of the tiles inbetween Rook and King are being attacked
const checkAttackRoute = (kingPiece, tile, chessBoard) => {
    // If tile is empty
    if (!tile.spaceOccupation) {
        // Convert tile location to index
        const tileIndexLocation = positionToIndex(tile.position);
        // Generate All Enemy Moves
        const validEnemyMoves = allEnemyMoves(kingPiece.pieceTeam, chessBoard);

        for (const enemyMove of validEnemyMoves) {
            if (enemyMove[0] === tileIndexLocation[0] && enemyMove[1] === tileIndexLocation[1]) {
                return true;
            }
        }

        return false;
    }
}

// Checks whether the route is empty or being attacked
const checkRoute = (kingPiece, kingPiecePosition, rookPieceLocation, chessBoard) => {
    // Row king is on
    const row = kingPiecePosition[0];
    // Col Rook is on
    const rookStartingCol = rookPieceLocation[1];
    // Decide whether we're moving right or left
    const direction = rookStartingCol < kingPiecePosition[1] ? 1 : -1;

    // Go from Rook to king
    for (let i = rookStartingCol + direction; i !== kingPiecePosition[1]; i += direction) {
        // Direct access to each tile
        const tile = chessBoard[row][i];
        // Check if any of the tiles are being attacked
        const attackTile = checkAttackRoute(kingPiece, tile, chessBoard);

        if (tile.spaceOccupation || attackTile) {
            return false;
        }
    }

    return true;
};

const kingLegalMove = (kingPiecePosition, direction) => {
    const row = kingPiecePosition[0];
    const col = kingPiecePosition[1];
    const moveDirection = direction === 'right' ? 1 : direction === 'left' ? -1 : 0;

    if (moveDirection !== 0) {
        const newPosition = [row, col + 2 * moveDirection];
        return newPosition;
    }
};
 
export const kingCastle = (kingPiece, direction, chessBoard) => {
    // Check if king piece has moved
    if (!kingPiece.hasMoved) {
        // Locate Rook
        const rookPiece = getRookPiece(chessBoard, direction, kingPiece.team);

        // Check if rook has moved
        if (rookPiece && !rookPiece.hasMoved) {
            // Check inbetween for: Empty Tiles and Attacked Tiles
            const emptyPath = (checkRoute(kingPiece, kingPiece.getCurrentPosition, rookPiece.getCurrentPosition, chessBoard));

            // If empty return 
            if (emptyPath) {
                return kingLegalMove(kingPiece.getCurrentPosition, direction);
            } 
        }
    }

    return null;
}