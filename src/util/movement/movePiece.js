import { pressedTile } from "../clickedPiece.js";
import { positionToIndex } from "../findLocation.js";
import { checkTile } from "./teamCheck.js";

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

const checkLocations = (selectedDestination, validMoves) => {
    for (const validLocation of validMoves) {
        const [validRow, validColumn] = validLocation;
        const [selectedRow, selectedColumn] = selectedDestination;

        if (selectedRow === validRow && selectedColumn === validColumn) {
            return true;
        }
    }

    return false;
}


const validateDestination = (initialSelectedPiece, destinationTile) => {
    const [destinationAlgebraicLocation, destinationIndexLocation] = destinationTile;

    const initialValidMoves = initialSelectedPiece.getValidMoves;


    // console.log(checkLocations(destinationIndexLocation, initialValidMoves));
}

const pressedSameTile = (destinationTile, initialPiece) => {
    return destinationTile.getCurrentPosition == initialPiece.getCurrentPosition ? true : false;
}


export const movePiece = async (initialSelectedPiece, initialSelectedPieceLocation, moveToTile, chessBoard) => {
    // Object - Tile or a Pawn
    const destinationTile = await pressedTile(moveToTile, chessBoard);
    // const destinationLocation = tileFullLocation(moveToTile);

    if (pressedSameTile(destinationTile, initialSelectedPiece)) {
        console.log("Pressed on the same tile");
        return;
    }

   checkTile(initialSelectedPieceLocation, initialSelectedPiece, destinationTile, chessBoard);

    // validateDestination(initialSelectedPiece, initialSelectedPieceLocation, destinationLocation)
};


// Get the current (first) piece object
// Current (first) location
// check against selected tile?