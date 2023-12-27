const getRookPiece = (chessBoard, side, team) => {
    const row = team === "white" ? 7 : 0;
    const col = side === "left" ? 0 : 7;

    const rookPiece = chessBoard[row][col].spaceOccupation;
 
    return rookPiece;
};

const checkRoute = (kingPiecePosition, rookPieceLocation, chessBoard) => {
    const row = kingPiecePosition[0];
    const rookStartingCol = rookPieceLocation[1];
    const direction = rookStartingCol < kingPiecePosition[1] ? 1 : -1;

    for (let i = rookStartingCol + direction; i !== kingPiecePosition[1]; i += direction) {
        const tile = chessBoard[row][i];

        if (tile.spaceOccupation) {
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
    if (!kingPiece.hasMoved) {
        const rookPiece = getRookPiece(chessBoard, direction, kingPiece.team);

        if (rookPiece && !rookPiece.hasMoved) {
            const emptyPath = (checkRoute(kingPiece.getCurrentPosition, rookPiece.getCurrentPosition, chessBoard));

            if (emptyPath) {
                return kingLegalMove(kingPiece.getCurrentPosition, direction);
            } 
        }
    }

    return null;
}