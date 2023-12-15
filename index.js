import { createBoard, renderChessboard } from "./src/board/board.js";
import { initializeBoardWithPieces } from "./src/pieces/initialise-pieces.js";
import { pressedTile, findTileByPosition, removeAllHighlightClasses, pressedElement} from "./src/util/clickedPiece.js";
import { movePiece } from "./src/util/movePiece.js";

const chessBoard = createBoard();

initializeBoardWithPieces(chessBoard)

renderChessboard(chessBoard);

const bodyElement = document.getElementById('body');
const chessBoardElement = document.querySelector('.chess-board');

let selectedPiece;

bodyElement.addEventListener('click', (event) => {
    const isClickedOnChessboard = chessBoardElement.contains(event.target);

    if (!isClickedOnChessboard) {
        removeAllHighlightClasses(chessBoard); 
        selectedPiece = null;
    }
});

chessBoardElement.addEventListener('click', async (event) => {
    if (!selectedPiece) {
        selectedPiece = await pressedTile(event, chessBoard);
        // console.log(selectedPiece)
    } else {
        await movePiece(selectedPiece, event, chessBoard)

        selectedPiece = null;
    }

});
