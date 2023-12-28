import { positionToIndex } from "../findLocation.js"
import { captureTile } from "./movePieceLogic.js";

const getRook = (castleMove) => {
    if (castleMove[1] > 4) {
        return [castleMove[0], 7]
    }

    return [castleMove[0], 0]
};

export const checkCastleMove = (kingPiece, destinationLocation, chessBoard) => {
    const kingDestinationIndex = positionToIndex(destinationLocation.position);
    const castleMoves = [kingPiece.rightCastle, kingPiece.leftCastle];

    for (const moves of castleMoves) {
        if (moves) {
            if (moves[0] == kingDestinationIndex[0] && moves[1] == kingDestinationIndex[1]) {
                const rookLocation = getRook(moves);
                const rookTile = chessBoard[rookLocation[0]][rookLocation[1]];
                const rookPiece = rookTile.spaceOccupation;

                let rookNewLocation;
                if (moves[1] < 4) {
                    rookNewLocation = chessBoard[moves[0]][kingDestinationIndex[1] + 1];
                } else {
                    rookNewLocation = chessBoard[moves[0]][kingDestinationIndex[1] - 1]; 
                }

                captureTile(rookPiece, rookTile, rookNewLocation, 3, chessBoard);
            }
        }
    }

}
