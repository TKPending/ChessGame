import { PLAYERGAME } from "../../player.js";

// Function to find a tile by its position on the chessboard
export function findTileByPosition(chessBoard, position) {
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
export const pressedElement = (clickedElement) => {
    const isChessTile = clickedElement.classList.contains('chess-tile');
    const isPieceImage = clickedElement.tagName === 'IMG';

    if (isChessTile || isPieceImage) {
        const clickedTile = isChessTile ? clickedElement : clickedElement.parentElement
        return clickedTile.id
    }
}

// Helper function to highlight a tile
export const highlightTile = (tilePosition) => {
    const tileElement = document.getElementById(tilePosition);
    if (tileElement) {
        tileElement.classList.add('highlighted');
    }
};


// Helper function to remove highlight class from all tiles
export const removeAllHighlightClasses = (chessBoard) => {
    chessBoard.forEach(row => {
        row.forEach(tile => {
            const tileElement = document.getElementById(tile.position);
            if (tileElement) {
                tileElement.classList.remove('highlighted', 'highlighted-red');
            }
        });
    });
};


// Return piece or tile
export const pressedTile = async (event, chessBoard) => {
    const clickedElement = event.target;
    const tilePosition = pressedElement(clickedElement);
    const clickedTile = findTileByPosition(chessBoard, tilePosition);

    removeAllHighlightClasses(chessBoard);

    // Check if the tile exists and has a piece
    if (clickedTile && clickedTile.spaceOccupation) {
        const pieceInClickedTile = clickedTile.spaceOccupation;
        const playerTurn = PLAYERGAME.currentTurn;

        if (pieceInClickedTile.pieceTeam == playerTurn) {
            highlightTile(tilePosition);
            const generatedMoves = await pieceInClickedTile.generateLegalMoves(chessBoard);
            // TODO - Create something here which will highlight illegal moves
            pieceInClickedTile.highlightTiles()
            pieceInClickedTile.validFutureMoves = generatedMoves
        } 

        return clickedTile.spaceOccupation;
    } 

    highlightTileOnly(event, chessBoard);

    return clickedTile;
}

export const highlightTileOnly = (event, chessBoard) => {
    removeAllHighlightClasses(chessBoard);

    const selectedTile = pressedElement(event.target);
    highlightTile(selectedTile);
}

