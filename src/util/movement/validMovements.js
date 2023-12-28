import { positionToIndex } from "../findLocation.js";

const validMovesArr = (selectedPiece, chessBoard) => {
    return selectedPiece.generateLegalMoves(chessBoard);
}

export const legalMoveCheck = (selectedPiece, destinationLocation, chessBoard) => {
    const tile = destinationLocation.getTileName;
    const tileLocation = tile == "Tile" ? positionToIndex(destinationLocation.position) : destinationLocation.getCurrentPosition;

    let destinationIndex = tileLocation;
    let validMoveLocations = validMovesArr(selectedPiece, chessBoard);

    for (const moves of validMoveLocations) {
        if (moves[0] == destinationIndex[0] && moves[1] == destinationIndex[1]) {
            return true;
        }
    }

    return false;
}
