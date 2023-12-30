import { pieceOrTile, MAXPIECES, BOARDMAX, enemyOrFriendly } from './checkmate.js';
import { Tile } from '../../board/board.js';

// Copy original chessboard
const updateTempChessboard = (kingPiece, originalRow, originalCol, targetRow, targetCol, tempChessboard) => {
    tempChessboard[targetRow][targetCol] = new Tile;
    tempChessboard[originalRow][originalCol] = new Tile;

    tempChessboard[targetRow][targetCol].pieceInSpace = kingPiece;
}

const emptyTempboard = (tempBoard) => {
    for (let row = 0; row < BOARDMAX; row++) {
        for (let col = 0; col < BOARDMAX; col++) {
            tempBoard[row][col] = null
        }
    }
}

const moveIntoCheckStatus = (potentialMove, tempEnemyMoves) => {
    for (const enemyMoves of tempEnemyMoves) {
        console.log(enemyMoves);
        if (potentialMove[0] == enemyMoves[0] && potentialMove[1] == enemyMoves[1]) {
            return true;
        }
    }

    return false;
}

// Potential Captures
const enemyPotentialMoves = (originalTeam, kingPotentialMove, tempBoard) => {
    let piecesFound = 0;
    const tempEnemyMoves = [];


    for (let row = 0; row < BOARDMAX && piecesFound < MAXPIECES; row++) {
        for (let col = 0; col < BOARDMAX; col++) {
            const piece = pieceOrTile(tempBoard[row][col]);

            if (piece) {
                const enemyPiece = enemyOrFriendly(piece, originalTeam);

                if (enemyPiece) {
                    piecesFound++;
                    tempEnemyMoves.push(...enemyPiece.generateLegalMoves(tempBoard));
                }   
            }
        }
    }

    return moveIntoCheckStatus(kingPotentialMove, tempEnemyMoves);
}   


// Play test
const testRunPotentialMoves = (kingPiece, originalTeam, potentialMove, chessBoard) => {
    const tempBoard = chessBoard.map(row => row.slice());
    const [originalRow, originalCol] = kingPiece.getCurrentPosition;
    const [targetRow, targetCol] = potentialMove;

    updateTempChessboard(kingPiece, originalRow, originalCol, targetRow, targetCol, tempBoard);

    const movingIntoCheckStatus = enemyPotentialMoves(originalTeam, potentialMove, tempBoard);

    emptyTempboard(tempBoard);

    return movingIntoCheckStatus ? true : false;
}

// Initiate Test Place
export const checkTestRun = (kingPiece, originalTeam, kingPotentialMove, chessBoard) => {
    const movingIntoCheck = testRunPotentialMoves(kingPiece, originalTeam, kingPotentialMove, chessBoard);

    if (movingIntoCheck) {
        console.log("Will be moving into check");
        return true;
    }

    return false;
}