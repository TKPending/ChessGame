import { positionToIndex } from "../findLocation.js";

const validMovesArr = (selectedPiece) => {
    return selectedPiece.generateLegalMoves();
}

export const legalMoveCheck = (selectedPiece, destinationLocation) => {
    let destinationIndex = positionToIndex(destinationLocation.position);
    let validMoveLocations = validMovesArr(selectedPiece);

    for (const moves of validMoveLocations) {
        if (moves[0] == destinationIndex[0] && moves[1] == destinationIndex[1]) {
            console.log("Valid Moves")
            return true;
        }
    }

    return false;
}
