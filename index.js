import { createBoard, renderChessboard } from "./src/board/board.js";
import { initializeBoardWithPieces } from "./src/pieces/initialise-pieces.js";
import { removeAllHighlightClasses, highlightTileOnly, pressedTile } from "./src/util/clickedPiece.js";
import { movePiece, pieceOrTile } from "./src/util/movePiece.js";

const chessBoard = createBoard();

initializeBoardWithPieces(chessBoard)

renderChessboard(chessBoard);

const bodyElement = document.getElementById('body');
const chessBoardElement = document.querySelector('.chess-board');

let selectedPiece;

// Remove all highlights when user clicks off board
bodyElement.addEventListener('click', (event) => {
    const isClickedOnChessboard = chessBoardElement.contains(event.target);

    if (!isClickedOnChessboard) {
        removeAllHighlightClasses(chessBoard); 
        selectedPiece = null;
    }
});

// Logic for moving pieces
chessBoardElement.addEventListener('click', async (event) => {
    const tileCheck = pieceOrTile(event);

    if (tileCheck && !selectedPiece) {
        console.log("Only a tile been pressed");
        highlightTileOnly(event, chessBoard);
    } else if (!tileCheck && !selectedPiece) {
        console.log("First time pressing on a piece")
        selectedPiece = await pressedTile(event, chessBoard);
    } else {
        console.log("A piece was previously clicked. So back to square one")
        selectedPiece = null;
    }
});