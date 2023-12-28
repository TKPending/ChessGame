const addEnemyMoves = (enemyPiece, currentTeam, enemyMoves) => {
    if (currentTeam !== enemyPiece.pieceTeamm) {
        for (const moves of enemyPiece.getValidMoves) {
            enemyMoves.push(moves);
        }
    }
}

// TODO: Could look to change MAXTEAMPIECES based on live changes
const enemyPotentialMoves = (currentTeam, chessBoard) => {
    const MAXTEAMPIECES = 16;
    let piecesFound = 0;
    
    const enemyMoves = [];

    for (let row = 0; row < 8; row++) {
        if (piecesFound > MAXTEAMPIECES) {
            break;
        }

        for (let col = 0; col < 8; col++) {
            const enemyPiece = chessBoard[row][col].spaceOccupation;

            if (enemyPiece) {
                piecesFound++;
                addEnemyMoves(enemyPiece, currentTeam, enemyMoves);
            }
        }
    }

    return enemyMoves;
}

const getKingLocation = (kingPieces) => {
    return {
        "black": kingPieces["black"].getCurrentPosition,
        "white": kingPieces["white"].getCurrentPosition
    }
}

const inCheck = (kingLocation, enemyMoves) => {
    for (const attackingMoves of enemyMoves) {
        if (kingLocation[0] == attackingMoves[0] && kingLocation[1] == attackingMoves[1]) {
            return true;  // In check
        }
    }

    return false;  // Not in check
}

// TODO: Update implementation based on turns
export const kingInCheck = (kingPieces, chessBoard) => {
    const kingLocations = getKingLocation(kingPieces);
    const blackKingThreats = enemyPotentialMoves("black", chessBoard);
    const whiteKingThreats = enemyPotentialMoves("white", chessBoard);

    const blackCheck = inCheck(kingLocations["black"], blackKingThreats);
    const whiteCheck = inCheck(kingLocations["white"], whiteKingThreats);
}