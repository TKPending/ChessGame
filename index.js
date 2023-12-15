// import { chessBoard } from "./src/board/board.js";
import { createBoard, renderChessboard } from "./src/board/board.js";
import { initializeBoardWithPieces } from "./src/pieces/initialise-pieces.js";
import { pressedTile } from "./src/util/clickedPiece.js";

const chessBoard = createBoard();

// Initialise initial pieces
initializeBoardWithPieces(chessBoard)


// Initial render of chessboard
renderChessboard(chessBoard);

// Add this after rendering the chessboard
const chessBoardElement = document.querySelector('.chess-board');

// Add an event listener to the chessboard element
chessBoardElement.addEventListener('click', (event) => {
    pressedTile(event, chessBoard)
});
