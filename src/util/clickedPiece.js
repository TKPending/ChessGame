import { PLAYERGAME } from "../functions/game_management/player.js";
import { findTileByPosition } from "./pieceTileLocation.js";

// Event Listener - Press on tile or piece
export const pieceOrTile = (selectedTile) => {
    const tile = selectedTile.target.classList.contains('chess-tile');

    return tile ? true : false;
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
                tileElement.classList.remove('highlighted', 'highlighted-red', 'enemy');
            }
        });
    });
};

// Change colour of enemy tiles
const highlightEnemy = (currentTeam, moves, chessBoard) => {
    for (const move of moves) {
        const potentialMove = chessBoard[move[0]][move[1]];

        if (potentialMove.ownsTile && potentialMove.ownsTile != currentTeam) {
            const tileElement = document.getElementById(potentialMove.position);

            if (tileElement) {
                tileElement.classList.add('enemy');
            }
        }
    }
}

// Return piece or tile
export const pressedTile = (event, chessBoard) => {
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
            const generatedMoves = pieceInClickedTile.generateLegalMoves(chessBoard);

            highlightEnemy(pieceInClickedTile.pieceTeam, generatedMoves, chessBoard,);

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

