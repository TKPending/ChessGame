import { PLAYERGAME, BLACKPLAYER, WHITEPLAYER } from "./player.js";
import { pressedElement } from "../../util/clickedPiece.js";
import { indexToLocation } from "../../util/pieceTileLocation.js";

export const clickedEnemyPieceGameManager = (initialPiece, event) => {
    if (initialPiece.pieceTeam !== PLAYERGAME.currentTurn) {
        gmHighlightEnemyPiece(event);
        initialPiece = undefined;
    }
}

export const enemyTeamPiecesGameManager = (currentTeam) => {
    if (currentTeam === "white") {
        return BLACKPLAYER.availablePieces;
    }

    return WHITEPLAYER.availablePieces;
}

// Remove enemy from available pieces
export const removeEnemyGameManager = (enemyPiece) => {
    if (enemyPiece.pieceTeam == "black") {
        BLACKPLAYER.availablePieces = BLACKPLAYER.availablePieces.filter(piece => piece.id !== enemyPiece.id);
        return;
    } 

    WHITEPLAYER.availablePieces = WHITEPLAYER.availablePieces.filter(piece => piece.id !== enemyPiece.id); 
}

const gmHighlightEnemyPiece = (event) => {
    const clickedElement = event.target;
    const tilePosition = pressedElement(clickedElement);
    const tileElementDOM = document.getElementById(tilePosition);

    if (tileElementDOM) {
        tileElementDOM.classList.add('highlighted-red');
    }
}

export const currentTurnGameManager = () => {
    const currentMove = PLAYERGAME.currentTurn == "white" ? "black" : "white";
    PLAYERGAME.currentTurn = currentMove;
}

const gmEndGame = (checkLevel) => {
    if (checkLevel == "inCheckmate") {
        PLAYERGAME.status = "finished";
        
        PLAYERGAME.winner = PLAYERGAME.currentTurn == "white" ? "Black" : "White";

        console.log(PLAYERGAME);
    }
}

export const updateKingInCheckGameManager = (checkLevel) => {
    const checkStatus = PLAYERGAME.currentTurn == "white" ? "white" : "black";

    if (checkStatus == "white") {
        WHITEPLAYER[checkLevel] = true;
    } else {
        BLACKPLAYER[checkLevel] = true;
    }

    gmEndGame(checkLevel);
    PLAYERGAME["checkWinning"] = checkStatus;
}

const gmUpdatePiecesCaptured = (enemyPiece) => {
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

    gmUpdatePiecesCaptured(enemyPiece);
    
    PLAYERGAME.moveHistory.push(algebraicValue);
}   

export const updateGameMovesGameManager = (destination) => {
    if (destination.getTileName) {
        PLAYERGAME.moveHistory.push(destination.position);
    } else {
        capturedEnemyPiece(destination);
    }

    const previousMoveLength = PLAYERGAME.moveHistory.length;
    PLAYERGAME.previousMove = PLAYERGAME.moveHistory[previousMoveLength - 1];
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

