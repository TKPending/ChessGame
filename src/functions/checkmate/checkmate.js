import { allEnemyMoves } from "../../util/allEnemyAttackIndexes.js";
import { updateKingInCheckGameManager } from "../game_management/gameManagement.js";

export const enemyOrFriendly = (piece, originalTeam) => {
    return piece.pieceTeam != originalTeam ? piece : undefined;
}

export const pieceOrTile = (chessBoardTile) => {
    return chessBoardTile.spaceOccupation;
}

const kingInCheck = (kingPiece, validEnemyMoves) => {
    const kingPosition = kingPiece.getCurrentPosition;

    for (const moves of validEnemyMoves) {
        if (moves[0] == kingPosition[0] && moves[1] == kingPosition[1]) {
                return true;
        }
    }

    return false;
}

const checkmateMoves = (kingMoves, enemyMoves) => {
    // Convert moves to sets to remove duplicates
    const uniqueKingMoves = new Set(kingMoves.map(move => move.toString()));
    const uniqueEnemyMoves = new Set(enemyMoves.map(move => move.toString()));

    // Check if all king moves are captured by enemy moves
    return [...uniqueKingMoves].every(move => uniqueEnemyMoves.has(move));
};

export const kingFutureMoves = (kingPiece, validEnemyMoves) => {
    const kingPotentialMoves = kingPiece.getValidMoves;

    return checkmateMoves(kingPotentialMoves, validEnemyMoves);
};


const kingInCheckmate = (kingPiece, inCheckCheck, validEnemyMoves, chessBoard) => {
    if (inCheckCheck) {
        kingPiece.generateLegalMoves(chessBoard);

        const checkmateMoves = kingFutureMoves(kingPiece, validEnemyMoves);

        return checkmateMoves ? true : false;
    }
}

// Original Team = The next players turn
const enemyThreats = (originalTeam, kingPiece, chessBoard) => {
    const validEnemyMoves = allEnemyMoves(originalTeam, chessBoard);
    const originalKing = kingPiece[originalTeam];

    const inCheckCheck = kingInCheck(originalKing, validEnemyMoves);
    const checkmateCheck = kingInCheckmate(originalKing, inCheckCheck, validEnemyMoves, chessBoard);

    return {
        "check": inCheckCheck || null,
        "checkmate": checkmateCheck || null
    }
}

export const checkmate = (originalTeam, kingPiece, chessBoard) => {
    console.log(`Checkmate: Checking whether king is in check`)
    const checkmateStatus = enemyThreats(originalTeam, kingPiece, chessBoard);
    const originalKing = kingPiece[originalTeam];

    if (checkmateStatus["check"] && checkmateStatus["checkmate"]) {
        console.log(`The ${originalKing.pieceTeam} king is in CHECKMATE`);
        updateKingInCheckGameManager("inCheckmate");

    } else if (checkmateStatus["check"]) {
        console.log(`The ${originalKing.pieceTeam} king is in CHECK`);
        updateKingInCheckGameManager("inCheck");

    }
}