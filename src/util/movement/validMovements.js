import { positionToIndex } from "../findLocation.js";
import { pieceOrTile } from "./movePiece.js";

const validMovesArr = (selectedPiece) => {
    return selectedPiece.generateLegalMoves();
}

export const legalMoveCheck = (selectedPiece, destinationLocation) => {
    const tile = destinationLocation.getTileName;
    const tileLocation = tile == "Tile" ? positionToIndex(destinationLocation.position) : destinationLocation.getCurrentPosition;

    let destinationIndex = tileLocation;
    let validMoveLocations = validMovesArr(selectedPiece);

    for (const moves of validMoveLocations) {
        if (moves[0] == destinationIndex[0] && moves[1] == destinationIndex[1]) {
            console.log("Valid Moves")
            return true;
        }
    }

    return false;
}
