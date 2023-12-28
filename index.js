import { createBoard, renderChessboard, reRenderChessboard } from "./src/board/board.js";
import { initializeBoardWithPieces } from "./src/pieces/initialise-pieces.js";
import { removeAllHighlightClasses, highlightTileOnly, pressedTile } from "./src/util/clickedPiece.js";
import { movePiece, pieceOrTile, tileFullLocation } from "./src/util/movement/movePiece.js";
 
const chessBoard = createBoard();

initializeBoardWithPieces(chessBoard)

renderChessboard(chessBoard);


console.log(chessBoard);

const bodyElement = document.getElementById('body');
const chessBoardElement = document.querySelector('.chess-board');

let initialSelectedPiece;
let initialSelectedPieceLocation;

// Remove all highlights when user clicks off board
bodyElement.addEventListener('click', (event) => {
    const isClickedOnChessboard = chessBoardElement.contains(event.target);

    if (!isClickedOnChessboard) {
        removeAllHighlightClasses(chessBoard); 
        initialSelectedPiece = null;
    }
});

const tilePressed = async (tileCheck, event) => {
    if (tileCheck && !initialSelectedPiece) {
        highlightTileOnly(event, chessBoard);
    } else if (!tileCheck && !initialSelectedPiece) {
        initialSelectedPieceLocation = tileFullLocation(event);
        initialSelectedPiece = await pressedTile(event, chessBoard);
    } else {
        await movePiece(initialSelectedPiece, initialSelectedPieceLocation, event, chessBoard);
        reRenderChessboard(chessBoard);

        initialSelectedPiece = null;
    }
}

// Logic for moving pieces - IN PROGRESS
chessBoardElement.addEventListener('click', async (event) => {
    const tileCheck = pieceOrTile(event);

    await tilePressed(tileCheck, event);
});