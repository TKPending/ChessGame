class Tile {
    constructor(position, colour) {
        this._object = "Tile";
        this._position = position;
        this._space = [] // Space in board
        this._pieceName = "";
        this._availability = true;
        this._tileColour = colour;
        this._ownedBy = null;
    }

    // Return string "Tile"
    get getTileName() {
        return this._object;
    }

    // Return name of the piece on tile
    get pieceOnTile() {
        return this._pieceName;
    }

    // Return location on board (Index)
    get position() {
        return this._position;
    }

    // Return availability of tile (DO I NEED THIS?)
    get pieceInWayCheck() {
        return this._availability;
    }

    // Return Piece or Nothing (Empty Tile)
    get spaceOccupation() {
        if (this._space.length === 0) {
            this._availability = true;
        } else {
            this._availability = false;
            return this._space;
        }
    }

    // Return what team owns tile
    get ownsTile() {
        return this._ownedBy;
    }

    /**
     * @param {any} piece
     */
    // Place piece into space or empty the tile
    set pieceInSpace(piece) {
        if (piece) {
            this._space = piece;
        } else {
            this._space = [];
        }
    }
    
    /**
     * @param {any} piece
     */
    // Update tile availability: True = Filled & False = Empty
    set tileAvailability(piece) {
        if (piece) {
            this._availability = true;
        } else {
            this._availability = false;
        }
    }

    /**
     * @param {any} piece
     */
    // Update ownership of tile: Black/White or Null
    set tileOwnership(piece) {
        if (piece) {
            this._ownedBy = piece.team == "white" ? "white" : "black" 
        } else {
            this._ownedBy = null;
        }
    }

    /**
     * @param {any} piece
     */
    // Update piece on tile's name
    set pieceOnTile(piece) {
        if (piece) {
            this._pieceName = piece;
        } else {
            this._pieceName = "";
        }
    }

    // Check if tile has piece
    tileHasPiece = (tileElement) => {
        // Check if the tile has a piece
        if (this.spaceOccupation) {
            // Render piece onto board
            const piece = this._space;

            const pieceElement = document.createElement('img');
            pieceElement.src = piece.renderPiece();
            pieceElement.alt = piece.name;
            pieceElement.id = `${this._position}`;

            tileElement.appendChild(pieceElement);
        }
    };

    // Return board tile
    boardTile() {
        const tileId = `${this._position}`;
        return `<div id="${tileId}"></div>`;
    }
}

export default Tile;