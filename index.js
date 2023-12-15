// import { chessBoard } from "./src/board/board.js";
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
    const clickedTile = await pressedTile(event, chessBoard);

    if (!selectedPiece) {
        if (clickedTile && clickedTile.spaceOccupation) {
            selectedPiece = clickedTile.spaceOccupation;
            console.log("Piece selected:", selectedPiece.name);
            removeAllHighlightClasses(chessBoard);
            const generatedMoves = await selectedPiece.generateLegalMoves();
            selectedPiece.validFutureMoves = generatedMoves;
            selectedPiece.highlightValidMoves();
        }
    } else {
        await movePiece(selectedPiece, event, chessBoard);
        selectedPiece = null;
    }
});

