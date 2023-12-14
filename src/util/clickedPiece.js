// Function to find a tile by its position on the chessboard
function findTileByPosition(chessBoard, position) {
    for (const row of chessBoard) {
        for (const tile of row) {
            if (tile.position === position) {
                return tile;
            }
        }
    }
    return null;
}

// Presss on the whole div
const pressedElement = (clickedElement) => {
    const isChessTile = clickedElement.classList.contains('chess-tile');
    const isPieceImage = clickedElement.tagName === 'IMG';

    if (isChessTile || isPieceImage) {
        const clickedTile = isChessTile ? clickedElement : clickedElement.parentElement
        return clickedTile.id
    }
}

// Return piece or tile
export const pressedTile = (event, chessBoard) => {
    const clickedElement = event.target;
    const tilePosition = pressedElement(clickedElement);
    const clickedTile = findTileByPosition(chessBoard, tilePosition)

    // Check if the tile exists and has a piece
    if (clickedTile && clickedTile.spaceOccupation) {
        console.log(`Piece in clicked tile (${tilePosition}) :`, clickedTile.spaceOccupation);
        return clickedTile.spaceOccupation;
    } else {
        console.log(`No piece in clicked tile or invalid tile. (${tilePosition})`);
        console.log(clickedTile)
        return clickedTile;
    }
}