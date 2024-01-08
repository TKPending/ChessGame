import { positionToIndex } from "../../util/pieceTileLocation.js"
import { movePieceOntoTile } from "../movePieceLogic.js";

// Return rook location
const getRook = (castleMove) => {
    if (castleMove[1] > 4) {
        return [castleMove[0], 7]
    }

    return [castleMove[0], 0]
};

// Check if king can castle, and update position
export const checkCastleMove = (kingPiece, destinationLocation, chessBoard) => {
    // Get destination tile index
    const kingDestinationIndex = positionToIndex(destinationLocation.position);
    // Rook Pieces
    const castleMoveDestination = [kingPiece.rightCastle, kingPiece.leftCastle];

    for (const moves of castleMoveDestination) {
        if (moves) {
            // Check if king wants to castle
            if (moves[0] == kingDestinationIndex[0] && moves[1] == kingDestinationIndex[1]) {
                // Rook Location
                const rookLocation = getRook(moves);
                // Rook Tile Location
                const rookTile = chessBoard[rookLocation[0]][rookLocation[1]];
                // Rook Piece
                const rookPiece = rookTile.spaceOccupation;

                let rookNewLocation;
                // Left Rook (Based on White)
                if (moves[1] < 4) {
                    rookNewLocation = chessBoard[moves[0]][kingDestinationIndex[1] + 1];
                // Right Hook
                } else {
                    rookNewLocation = chessBoard[moves[0]][kingDestinationIndex[1] - 1]; 
                }

                // Move Rook
                movePieceOntoTile(rookPiece, rookTile, rookNewLocation, 3, chessBoard);
            }
        }
    }

}
