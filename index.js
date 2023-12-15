// import { chessBoard } from "./src/board/board.js";
import { createBoard, renderChessboard } from "./src/board/board.js";
import { Pawn } from "./src/pieces/pawn.js";
import { Knight } from "./src/pieces/knight.js";
import { pieceToTileData, resetTileData } from "./src/util/pieceToTile.js";
import { pressedTile } from "./src/util/clickedPiece.js";

const chessBoard = createBoard();



// Function to initialize the board with pieces
const initializeBoardWithPawns = () => {
    // Place black pawns on the second row
    for (let col = 0; col < 8; col++) {
        const tileLocation = chessBoard[1][col];
        const blackPawns = new Pawn("black", [1, col]);

        tileLocation.pieceInSpace = blackPawns;
        pieceToTileData(tileLocation, blackPawns);
    }

    // Place white pawns on seventh row
    for (let col = 0; col < 8; col++) {
        const tileLocation = chessBoard[6][col];
        const whitePawns = new Pawn("white", [6, col]);

        tileLocation.pieceInSpace = whitePawns;
        pieceToTileData(tileLocation, whitePawns)
    }
};

// Function to initialize the board with pieces
const initializeBoardWithKnights = () => {
    // Place black knights on the first row
    placeKnight("black", 0, 1);
    placeKnight("black", 0, 6);

    // Place white knights on the eighth row
    placeKnight("white", 7, 1);
    placeKnight("white", 7, 6);
};

// Function to place a knight on the board
const placeKnight = (team, row, col) => {
    const tileLocation = chessBoard[row][col];
    const knight = new Knight(team, [row, col]);

    tileLocation.pieceInSpace = knight;
    pieceToTileData(tileLocation, knight);
};


// Call the function to initialize the board with pawns
initializeBoardWithPawns();
// Call the funciton to initialize the board with knights
initializeBoardWithKnights();


// Initial render of chessboard
renderChessboard(chessBoard);

// Add this after rendering the chessboard
const chessBoardElement = document.querySelector('.chess-board');

// Add an event listener to the chessboard element
chessBoardElement.addEventListener('click', (event) => {
    pressedTile(event, chessBoard)
});

