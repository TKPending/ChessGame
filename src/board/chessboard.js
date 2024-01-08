import Tile from "./tiles.js";

const ROWS = 8;
const COLS = 8;
const BLACK = 'bg-black-own';
const WHITE = 'bg-white-own';

// Create 2D Object Chessboard (No Render)
export const createChessboard = () => {
    const x = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();
    const y = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const chessboard = [];

    // Create Rows
    for (let row = 0; row < ROWS; row++) {
        const rowArray = [];

        // Create Cols
        for (let col = 0; col < COLS; col++) {
            const positionName = y[col] + x[row];
            const color = (row + col) % 2 === 0 ? WHITE : BLACK;
            const tile = new Tile(positionName, color);
            // Add Tile
            rowArray.push(tile);
        }

        // Push row to chessboard
        chessboard.push(rowArray);
    }

    return chessboard;
};

// Render each tile with and without pieces
const renderChessboard  = (chessBoard, chessBoardElement) => {
    chessBoard.forEach(row => {
        row.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('chess-tile', tile._tileColour);

            tileElement.id = `${tile.position}`;

            // Check piece positions
            tile.tileHasPiece(tileElement);

            // Add tile
            chessBoardElement.appendChild(tileElement);
        })
    })
}

// Re-render the chessboard without getting rid of event listener
export const reRenderChessboard = (chessBoard) => {
    const chessBoardElement = document.querySelector('.chess-board');

    // Get each child element in chessboard
    while (chessBoardElement.firstChild) {
        chessBoardElement.removeChild(chessBoardElement.firstChild);
    }

    renderChessboard(chessBoard, chessBoardElement);
}

// Empty Board
export const clearBoard = (chessBoard) => {
    chessBoard.forEach(row => {
        row.forEach(tile => {
            tile.pieceInSpace = null;
            tile.tileAvailability = true;
            tile.tileOwnership = null;
            tile.pieceOnTile = null;
        });
    });
};


// Create visual chessboard (Rendered)
export const initialChessboardRender = (chessBoard) => {
    const chessBoardElement = document.createElement('div');
    chessBoardElement.classList.add('chess-board');

    renderChessboard(chessBoard, chessBoardElement);

    // Append the chess board element to the body of the document
    document.body.appendChild(chessBoardElement);
}
