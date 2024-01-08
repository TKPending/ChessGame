import { positionToIndex, indexToTile, findTileByPosition } from "../util/pieceTileLocation.js";
import { legalMoveCheck } from "../util/validMovements.js";
import { pawnPromotion } from "./pawnPromotion.js";
import { checkCastleMove } from "./castling/castleMovement.js";
import { currentTurnGameManager, updateGameMovesGameManager } from "./game_management/gameManagement.js";
import { removeEnemyGameManager } from "./game_management/gameManagement.js";

const FRIENDLY = 1;
const ENEMY = 2;
const EMPTY = 3;

// Friendly fire?
const friendlyFire = (destinationTile, initialTile) => {
    const extractedDestination = extractDestinationTileInformation(destinationTile);
    const initialTeam = initialTile.ownsTile;
    const extractedTeam = extractedDestination ? extractedDestination["team"] : extractedDestination;

    return initialTeam === extractedTeam ? FRIENDLY : extractedTeam == null ? EMPTY : ENEMY;
}

// Enemy piece or not
const extractDestinationTileInformation = (destinationTile) => {
    // Tile
    if (destinationTile.getTileName) {
        return destinationTile.ownsTile;
    } 

    // Piece
    const destinationPiece = destinationTile;
    
    return {
        "piece-name": destinationPiece.name, // Future reference king?
        "team": destinationPiece.team
    }
}

// Update the location of the initial piece - UPDATE PIECE OBJ
const updateInitialPiece = (destinationTile, initialTile, initialPiece, space) => {
    initialPiece.updateLastPosition = positionToIndex(initialTile.position);
    initialPiece.updateCurrentPosition = space == 3 ? positionToIndex(destinationTile.position) : destinationTile.getCurrentPosition;
    initialPiece.hasMoved = true;
}

// Piece has moved out, update the initial tile to be empty again - UPDATE TILE OBJ (Initial)
const updateInitialTile = (initialTile) => {
    initialTile.pieceInSpace = null;
    initialTile.tileAvailability = null;
    initialTile.tileOwnership = null;
    initialTile.pieceOnTile = null;
}

// Update Tile with new piece information - UPDATE TILE OBJ (Destination)
const updateEmptyTile = (destinationTile, initialPiece) => {
    destinationTile.pieceInSpace = initialPiece;
    destinationTile.pieceOnTile = initialPiece.name;
    destinationTile.tileAvailability = initialPiece;
    destinationTile.tileOwnership = initialPiece;
}

const findEnemyTile = (destinationPiece, chessBoard) => {
    const tileLocation = destinationPiece.getCurrentPosition;
    const tile = indexToTile(chessBoard, tileLocation);

    return tile;
}

// Piece has moved in, update destination tile to have a piece
const updateEnemyTile = (destinationTile, initialPiece, chessBoard) => {
    const enemyTile = findEnemyTile(destinationTile, chessBoard);
    removeEnemyGameManager(destinationTile, initialPiece);
    removeEnemy(destinationTile);
    updateEmptyTile(enemyTile, initialPiece);
}

// Remove piece from tile if captured
const removeEnemy = (enemyPiece) => {
    if (enemyPiece) {
        enemyPiece.pieceCaptured();
        enemyPiece.updateLastPosition = enemyPiece.getCurrentPosition;
        enemyPiece.updateCurrentPosition = "Captured";
    }
}


// Enemy piece is in tile. Take over tile
export const movePieceOntoTile = async (initialPiece, initialTile, destinationTile, space, chessBoard) => {
    updateInitialPiece(destinationTile, initialTile, initialPiece, space);
    updateInitialTile(initialTile);

    if (space == 3) {
        updateEmptyTile(destinationTile, initialPiece)
    } else {
        updateEnemyTile(destinationTile, initialPiece, chessBoard);
    }

    initialPiece.generateLegalMoves(chessBoard);
}

// Get the initial piece location, tile from the chessboard
const locateInitialTile = (initialTileLocation, chessBoard) => {
    const algebraicValue = initialTileLocation[0];

    return findTileByPosition(chessBoard, algebraicValue);
}

export const movePieceCheck = (initialSelectedPieceLocation, initialPiece, destinationTilePiece, chessBoard) => {
    // Initial Selected Tile
    const initialTile = locateInitialTile(initialSelectedPieceLocation, chessBoard);
    // Check whether destination is: Friendly 1, Enemy 2 or Empty 3
    const friendlyFireCheck = friendlyFire(destinationTilePiece, initialTile);
    // Check move is legal
    const legalMove = legalMoveCheck(initialPiece, destinationTilePiece, chessBoard);

    // Move is legal
    if (friendlyFireCheck != FRIENDLY && legalMove) {
        // King Castle
        if (initialPiece.getPieceName == "King" && !initialPiece.hasMoved) {
            checkCastleMove(initialPiece, destinationTilePiece, chessBoard);
        }

        movePieceOntoTile(initialPiece, initialTile, destinationTilePiece, friendlyFireCheck, chessBoard);
        
        if (initialPiece.getPieceName == "Pawn") {
            pawnPromotion(initialPiece, chessBoard);
        }

        updateGameMovesGameManager(destinationTilePiece);

        currentTurnGameManager();

        return;
    } else if (!legalMove) {
        console.log("Illegal Move");
        return;
    }

    console.log("Can't take over friendly");
    return;

}