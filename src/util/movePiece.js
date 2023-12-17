import { positionToIndex } from "./findLocation.js";

const tileAlgebraicLocation = (selectedTile) => {
    const selectedElement = selectedTile.target;

    const isChessTile = selectedElement.classList.contains('chess-tile');
    const isChessPiece = selectedElement.tagName === 'IMG';

    if (isChessTile || isChessPiece) {
        return isChessTile ? selectedElement.id : selectedElement.parentElement.id;
    }
}

const tileFullLocation = (selectedTile) => {
    const algebraicLocation = tileAlgebraicLocation(selectedTile);
    const indexLocation = positionToIndex(algebraicLocation);
    
    return [algebraicLocation, indexLocation];
}

export const pieceOrTile = (selectedTile) => {
    const tile = selectedTile.target.classList.contains('chess-tile');

    return tile ? true : false;
}


export const movePiece = (selectedTile) => {
};
