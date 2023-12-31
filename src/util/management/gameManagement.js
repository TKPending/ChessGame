import { PLAYERS, PLAYERGAME, BLACKPLAYER, WHITEPLAYER } from "../../../player.js";
import { findTileByPosition, pressedElement } from "../clickedPiece.js";
import { pieceOrTile } from "../checkmate/checkmate.js";
import { indexToLocation } from "../findLocation.js";

export const clickedEnemyPiece = (initialPiece, event) => {
    if (initialPiece.pieceTeam !== PLAYERGAME.currentTurn) {
        highlightEnemyPiece(event);
        initialPiece = undefined;
    }
}

const highlightEnemyPiece = (event) => {
    const clickedElement = event.target;
    const tilePosition = pressedElement(clickedElement);
    const tileElementDOM = document.getElementById(tilePosition);

    if (tileElementDOM) {
        tileElementDOM.classList.add('highlighted-red');
    }
}

export const currentTurn = () => {
    const currentMove = PLAYERGAME.currentTurn == "white" ? "black" : "white";
    PLAYERGAME.currentTurn = currentMove;
}

const endGame = (checkLevel) => {
    if (checkLevel == "inCheckmate") {
        PLAYERGAME.status = "finished";
        
        PLAYERGAME.winner = PLAYERGAME.currentTurn == "white" ? "Black" : "White";

        console.log(PLAYERGAME);
    }
}

export const updateKingInCheck = (checkLevel) => {
    const checkStatus = PLAYERGAME.currentTurn == "white" ? "white" : "black";

    if (checkStatus == "white") {
        WHITEPLAYER[checkLevel] = true;
    } else {
        BLACKPLAYER[checkLevel] = true;
    }

    endGame(checkLevel);
    PLAYERGAME["checkWinning"] = checkStatus;
}

const updatePiecesCaptured = (enemyPiece) => {
    const currentTeam = PLAYERGAME.currentTurn == "white" ? "white" : "black";

    if (currentTeam == "white") {
        WHITEPLAYER.piecesCaptured.push(enemyPiece);
    } else {
        BLACKPLAYER.piecesCaptured.push(enemyPiece);
    }
}

const capturedEnemyPiece = (enemyPiece) => {
    const enemyLocation = enemyPiece.getLastPosition;
    const algebraicValue = indexToLocation(enemyLocation, PLAYERGAME.currentTurn);

    updatePiecesCaptured(enemyPiece);
    
    PLAYERGAME.moveHistory.push(algebraicValue);
}   

export const updateGameMoves = (destination) => {
    if (destination.getTileName) {
        PLAYERGAME.moveHistory.push(destination.position);
    } else {
        capturedEnemyPiece(destination);
    }

    const previousMoveLength = PLAYERGAME.moveHistory.length;
    PLAYERGAME.previousMove = PLAYERGAME.moveHistory[previousMoveLength - 1];

    console.log(PLAYERGAME);
}

export const pawnPromotionsTracker = (pawnLocation, newPieceName) => {
    const algebraicValue = indexToLocation(pawnLocation, PLAYERGAME.currentTurn)

    return {
        "location": algebraicValue,
        "pieceConvertedTo": newPieceName,
        "turn": PLAYERGAME.moveHistory.length,
        "player": PLAYERGAME.currentTurn
    }
}

