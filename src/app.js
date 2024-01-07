import { pressedTile } from "./util/clickedPiece.js";
import { movePieceCheck } from "./functions/movePieceLogic.js";
import { PLAYERGAME } from "./functions/game_management/player.js";

// User has pressed on the same tile
const pressedSameTile = (destinationTile, initialPiece) => {
    return destinationTile.getCurrentPosition == initialPiece.getCurrentPosition ? true : false;
}

export const movePiece = (initialSelectedPiece, initialSelectedPieceLocation, moveToTile, chessBoard) => {
    // Object - Tile or a Pawn
    const destinationTilePiece = pressedTile(moveToTile, chessBoard);

    if (initialSelectedPiece.pieceTeam == PLAYERGAME.currentTurn) {
        initialSelectedPiece.resetProtected = [];

        if (pressedSameTile(destinationTilePiece, initialSelectedPiece)) {
            console.log("Pressed on the same tile");
            return;
        }

        movePieceCheck(initialSelectedPieceLocation, initialSelectedPiece, destinationTilePiece, chessBoard);
    } 
};