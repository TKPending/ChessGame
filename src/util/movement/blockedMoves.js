import { positionToIndex } from "../findLocation.js";

const isPathClear = (initialPosition, destinationPosition, chessBoard) => {
    const [initialRow, initialCol] = positionToIndex(initialPosition);
    const [destinationRow, destinationCol] = positionToIndex(destinationPosition);

    // Check if there's any piece in between the initial and destination positions
    const rowDirection = Math.sign(destinationRow - initialRow);
    const colDirection = Math.sign(destinationCol - initialCol);

    for (let row = initialRow + rowDirection, col = initialCol + colDirection;
         row !== destinationRow || col !== destinationCol;
         row += rowDirection, col += colDirection) {
        const tile = chessBoard[row][col];
        if (tile.pieceInSpace) {
            return false; // There is a piece in the way
        }
    }

    return true; // Path is clear
};

export const legalMoveCheck = (initialPiece, destinationTile) => {
    // Check other conditions for legal move...

    // Check if the path is clear
    const initialPosition = initialPiece.getCurrentPosition();
    const destinationPosition = destinationTile.position;

    console.log(`Initial Position: ${initialPosition} and Destination: ${destinationPosition}`)

    const isPathValid = isPathClear(initialPosition, destinationPosition, chessBoard);

    return isPathValid;
};
