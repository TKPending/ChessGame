import { findTileByPosition } from "../clickedPiece.js";

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
const updateInitialPiece = (tileLocation, initialPiece) => {
    initialPiece.updateLastPosition = tileLocation;
    initialPiece.updateCurrentPosition = tileLocation;
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
    destinationTile.pieceName = initialPiece.name;
    destinationTile.tileAvailability = initialPiece;
    destinationTile.tileOwnership = initialPiece;
}

// Piece has moved in, update destination tile to have a piece
const updateEnemyTile = (initialTile, destinationTile) => {
    removeEnemy(destinationTile);
    updateEmptyTile(initialTile, destinationTile);
}

// Remove piece from tile if captured
const removeEnemy = (destinationTile) => {
    const enemyPiece = destinationTile.spaceOccupation;

    if (enemyPiece) {
        enemyPiece.pieceCapture();
        enemyPiece.updateLastPosition = occupiedPiece.getCurrentPosition;
        enemyPiece.updateCurrentPosition = "Captured";
    }
}


// Enemy piece is in tile. Take over tile
const captureTile = (initialPiece, initialTile, destinationTile) => {
    updateInitialPiece(initialPiece);
    updateInitialTile(initialTile);

    if (destinationTile.spaceOccupation) {
        updateEmptyTile(initialTile, destinationTile)
    } else {
        updateEnemyTile(initialTile, destinationTile);
    }
}

// Get the initial piece location, tile from the chessboard
const locateInitialTile = (initialTileLocation, chessBoard) => {
    return findTileByPosition(chessBoard, initialTileLocation);
}

export const checkTile = (initialSelectedPieceLocation,initialPiece, destinationTile, chessBoard) => {
    const initialTile = locateInitialTile(initialSelectedPieceLocation, initialPiece, chessBoard);
    const friendlyFireCheck = friendlyFire(destinationTile, initialTile);

    if (friendlyFireCheck != FRIENDLY) {
        captureTile(initialPiece, initialTile, destinationTile);
        return;
    }

    console.log("Can't take over friendly");

}