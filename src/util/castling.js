import { allEnemyMoves } from "./checkmate/movingIntoCheck.js";
import { positionToIndex } from "./findLocation.js";

const getRookPiece = (chessBoard, side, team) => {
    const row = team === "white" ? 7 : 0;
    const col = side === "left" ? 0 : 7;

    const rookPiece = chessBoard[row][col].spaceOccupation;
 
    return rookPiece;
};

const checkAttackRoute = (kingPiece, tile, chessBoard) => {
    if (!tile.spaceOccupation) {
        const tileIndexLocation = positionToIndex(tile.position);
        const validEnemyMoves = allEnemyMoves(kingPiece.pieceTeam, chessBoard);

        for (const enemyMove of validEnemyMoves) {
            if (enemyMove[0] === tileIndexLocation[0] && enemyMove[1] === tileIndexLocation[1]) {
                return true;
            }
        }

        return false;
    }
}

const checkRoute = (kingPiece, kingPiecePosition, rookPieceLocation, chessBoard) => {
    const row = kingPiecePosition[0];
    const rookStartingCol = rookPieceLocation[1];
    const direction = rookStartingCol < kingPiecePosition[1] ? 1 : -1;

    for (let i = rookStartingCol + direction; i !== kingPiecePosition[1]; i += direction) {
        const tile = chessBoard[row][i];
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