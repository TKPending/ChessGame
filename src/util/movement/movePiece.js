import { pressedTile } from "../clickedPiece.js";
import { positionToIndex } from "../findLocation.js";
import { checkTile } from "./movePieceLogic.js";

const tileAlgebraicLocation = (selectedTile) => {
    const selectedElement = selectedTile.target;

    const isChessTile = selectedElement.classList.contains('chess-tile');
    const isChessPiece = selectedElement.tagName === 'IMG';

    if (isChessTile || isChessPiece) {
        return isChessTile ? selectedElement.id : selectedElement.parentElement.id;
    }
}

export const tileFullLocation = (selectedTile) => {
    const algebraicLocation = tileAlgebraicLocation(selectedTile);
    const indexLocation = positionToIndex(algebraicLocation);

    return [algebraicLocation, indexLocation];
}

export const pieceOrTile = (selectedTile) => {
    const tile = selectedTile.target.classList.contains('chess-tile');

    return tile ? true : false;
}

// ERROR: Can't read property of null;
const pressedSameTile = (destinationTile, initialPiece) => {
    return destinationTile.getCurrentPosition == initialPiece.getCurrentPosition ? true : false;
}


export const movePiece = async (initialSelectedPiece, initialSelectedPieceLocation, moveToTile, chessBoard) => {
    // Object - Tile or a Pawn
    const destinationTilePiece = await pressedTile(moveToTile, chessBoard);

    if (pressedSameTile(destinationTilePiece, initialSelectedPiece)) {
        console.log("Pressed on the same tile");
        return;
    }

   await checkTile(initialSelectedPieceLocation, initialSelectedPiece, destinationTilePiece, chessBoard);

};