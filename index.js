import { createChessboard, initialChessboardRender, reRenderChessboard } from "./src/board/chessboard.js";
import { initializeBoardWithPieces } from "./src/pieces/initialise-pieces.js";
import { removeAllHighlightClasses, highlightTileOnly, pressedTile } from "./src/util/clickedPiece.js";
import { movePiece, pieceOrTile, tileFullLocation } from "./src/util/movement/movePiece.js";
import { PLAYERGAME, WHITEPLAYER, BLACKPLAYER } from "./player.js";
import { clickedEnemyPiece} from "./src/util/management/gameManagement.js";
import { checkmate } from "./src/util/checkmate/checkmate.js";
import { gameHasEnded } from "./src/util/management/managementDesign.js";
 
// Create and render the chessboard
export const chessBoard = createChessboard();
initializeBoardWithPieces(chessBoard)
initialChessboardRender(chessBoard);

// Background and Chessboard element
const bodyElement = document.getElementById('body');
const chessBoardElement = document.querySelector('.chess-board');

// Track initial selected piece
let initialSelectedPiece;
let initialSelectedPieceLocation;

// Track Kings
const KINGS = {
    "white": chessBoard[7][4].spaceOccupation,
    "black": chessBoard[0][4].spaceOccupation
}

// When user presses off the chessboard
bodyElement.addEventListener('click', (event) => {
    const isClickedOnChessboard = chessBoardElement.contains(event.target);

    if (!isClickedOnChessboard) {
        removeAllHighlightClasses(chessBoard); 
        initialSelectedPiece = null;
    }
});

// Deals with when a tile has been pressed
const tilePressed = async (tileCheck, event) => {
    // User presses an empty tile
    if (tileCheck && !initialSelectedPiece) {
        highlightTileOnly(event, chessBoard);
    // User initially presses on a piece
    } else if (!tileCheck && !initialSelectedPiece) {
        initialSelectedPieceLocation = tileFullLocation(event);
        initialSelectedPiece = await pressedTile(event, chessBoard);

        clickedEnemyPiece(initialSelectedPiece, event);
    // User pressed on a piece and decides to move it
    } else {
        await movePiece(initialSelectedPiece, initialSelectedPieceLocation, event, chessBoard);
        reRenderChessboard(chessBoard)

        checkmate(PLAYERGAME.currentTurn, KINGS, chessBoard);

        initialSelectedPiece = null;
    }
}

// When user presses on chessboard
chessBoardElement.addEventListener('click', async (event) => {
    if (PLAYERGAME.status !== "finished") {
        const tileCheck = pieceOrTile(event);

        await tilePressed(tileCheck, event);

        if (PLAYERGAME.status == "finished") {
            gameHasEnded();
        }
    } 
        
});