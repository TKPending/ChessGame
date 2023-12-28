import { 
    addEnemyMoves, 
    enemyPotentialMoves, 
    getKingLocation, 
    inCheck 
} from "./checkmate.js";

// TODO: Update implementation based on turns
export const kingInCheck = (kingPieces, chessBoard) => {
    const kingLocations = getKingLocation(kingPieces);
    const blackKingThreats = enemyPotentialMoves("black", chessBoard);
    const whiteKingThreats = enemyPotentialMoves("white", chessBoard);

    const blackCheck = inCheck(kingLocations["black"], blackKingThreats);
    const whiteCheck = inCheck(kingLocations["white"], whiteKingThreats);
}