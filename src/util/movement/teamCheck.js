import { findTileByPosition } from "../clickedPiece.js";
import { positionToIndex } from "../findLocation.js";

const FRIENDLY = 1;
const ENEMY = 2;
const EMPTY = 3;

// Friendly fire?
const friendlyFire = (destinationTile, initialTile) => {
    const extractedDestination = extractDestinationTileInformation(destinationTile);
    const initialTeam = initialTile.ownsTile;
    const extractedTeam = extractedDestination ? extractedDestination["team"] : null;

    return initialTeam === extractedTeam ? FRIENDLY : extractedTeam == null ? EMPTY : ENEMY;
}

// Enemy piece or not
const extractDestinationTileInformation = (destinationTile) => {
    const insideTile = destinationTile.spaceOccupation;

    if (insideTile) {
        return {
            "piece-name": insideTile.name, // Future use for kings?
            "team": insideTile.team,
        }
    } 

    return null;
}

// Update the location of the initial piece - UPDATE PIECE OBJ
const updateInitialPiece = (destinationTile, initialTile, initialPiece) => {
    initialPiece.updateLastPosition = positionToIndex(initialTile.position);
    initialPiece.updateCurrentPosition = positionToIndex(destinationTile.position);
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

// Piece has moved in, update destination tile to have a piece
const updateEnemyTile = (destinationTile, initialPiece) => {
    removeEnemy(destinationTile);
    updateEmptyTile(destinationTile, initialPiece);
}

// Remove piece from tile if captured
const removeEnemy = (destinationTile) => {
    const enemyPiece = destinationTile.spaceOccupation;

    if (enemyPiece) {
        enemyPiece.pieceCapture();
        enemyPiece.updateLastPosition = enemyPiece.getCurrentPosition;
        enemyPiece.updateCurrentPosition = "Captured";
    }
}


// Enemy piece is in tile. Take over tile
const captureTile = (initialPiece, initialTile, destinationTile) => {
    updateInitialPiece(destinationTile, initialTile, initialPiece);
    updateInitialTile(initialTile);

    if (!destinationTile.spaceOccupation) {
        updateEmptyTile(destinationTile, initialPiece)
    } else {
        updateEnemyTile(destinationTile, initialPiece);
    }
}

// Get the initial piece location, tile from the chessboard
const locateInitialTile = (initialTileLocation, chessBoard) => {
    const algebraicValue = initialTileLocation[0];

    return findTileByPosition(chessBoard, algebraicValue);
}

export const checkTile = (initialSelectedPieceLocation, initialPiece, destinationTile, chessBoard) => {
    const initialTile = locateInitialTile(initialSelectedPieceLocation, chessBoard);
    const friendlyFireCheck = friendlyFire(destinationTile, initialTile);

    if (friendlyFireCheck != FRIENDLY) {
        captureTile(initialPiece, initialTile, destinationTile);
        return;
    }

    console.log("Can't take over friendly");
    return;

}