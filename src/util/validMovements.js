import { positionToIndex } from "./pieceTileLocation.js";
import { allEnemyMoves } from "./allEnemyAttackIndexes.js";

// Check whether the move a user wants to make is legal
export const legalMoveCheck = (selectedPiece, destinationLocation, chessBoard) => {
    // Retunrs string either Tile or Undefined
    const tile = destinationLocation.getTileName;
    // Returns an index of the tile or piece location
    const destinationIndex = tile == "Tile" ? positionToIndex(destinationLocation.position) : destinationLocation.getCurrentPosition;

    // Returns an array of valid moves
    const validMoveIndexLocations = selectedPiece.generateLegalMoves(chessBoard);

    // Check valid move
    for (const moves of validMoveIndexLocations) {
        // Check if destination is part of legal move
        if (moves[0] == destinationIndex[0] && moves[1] == destinationIndex[1]) {
            // Legal Move
            return true;
        }
    }

    // Illegal Move
    return false;
}
