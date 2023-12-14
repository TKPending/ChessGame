const ROWS = 8;
const COLS = 8;
const BLACK = 'bg-black';
const WHITE = 'bg-white';

class Tile {
    constructor(position, colour) {
        this._position = position;
        this._space = [] // Space in board
        this._pieceName = "";
        this._availability = true;
        this._tileColour = colour;
        this._ownedBy = null;
    }

    // Return location on board
    get position() {
        // console.log(`Board Location: ${this._position}`);
        return this._position;
    }

    // Return whether space is occupied
    get spaceOccupation() {
        if (this._space.length === 0) {
            this._availability = true;
        } else {
            this._availability = false;
            return this._space;
        }
    }

    /**
     * @param {any} piece
     */
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
    set tileAvailability(piece) {
        if (piece) {
            this._availability = true;
        } else {
            this._availability = false;
        }
    }

    /**
     * @param {{ team: string; }} piece
     */
    set tileOwnership(piece) {
        if (piece) {
            this._ownedBy = piece.team == "white" ? "white" : "black" 
        } else {
            this._ownedBy = null;
        }
    }

    /**
     * @param {{ name: string; }} piece
     */
    set pieceOnTile(piece) {
        if (piece) {
            this._pieceName = piece.name;
        } else {
            this._pieceName = "";
        }
    }

    // Return board tile
    boardTile() {
        const tileId = `${this._position}`;
        return `<div id="${tileId}"></div>`;
    }
}

// Board Design - 2D Array of tiles
export const createBoard = () => {
    const x = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const y = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const board = [];

    for (let row = 0; row < ROWS; row++) {
        const rowArray = [];

        for (let col = 0; col < COLS; col++) {
            const positionName = y[col] + x[row];
            const color = (row + col) % 2 === 0 ? WHITE : BLACK;
            const tile = new Tile(positionName, color);
            rowArray.push(tile);
        }

        board.push(rowArray);
    }

    return board;
};

// Check if tile has piece
    const tileHasPiece = (tile, tileElement) => {
        // Check if the tile has a piece
        if (tile.spaceOccupation) {
            const piece = tile._space;
            const imgId = `${tile.position}`;

            const pieceElement = document.createElement('img');
            pieceElement.src = piece.renderPiece();
            pieceElement.alt = piece.name;
            pieceElement.id = imgId;

           tileElement.appendChild(pieceElement);
        }
};


const resetChessboard = () => {
    // Remove existing chessboard element
    const existingChessboard = document.querySelector('.chess-board');
    if (existingChessboard) {
        existingChessboard.remove();
    }
}

export const renderChessboard = (chessBoard) => {
    resetChessboard()

    // Create the chess board element
    const chessBoardElement = document.createElement('div');
    chessBoardElement.classList.add('chess-board');

    // Append tiles to the chess board element
    chessBoard.forEach(row => {
        row.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('chess-tile', tile._tileColour);

            const tileId = `${tile.position}`;
            tileElement.id = tileId;

            tileHasPiece(tile, tileElement);

            chessBoardElement.appendChild(tileElement);
        });
    });

    // Append the chess board element to the body of the document
    document.body.appendChild(chessBoardElement);
}
