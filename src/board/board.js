const ROWS = 8;
const COLS = 8;
const BLACK = 'bg-black';
const WHITE = 'bg-white';

class Tile {
    constructor(position, colour) {
        this._position = position;
        this._space = [] // Space in board
        this._availability = true;
        this._colour = colour;
        this._ownedBy = null;
    }

    // Return location on board
    get position() {
        return `Board Location: ${this._position} & Coloured: ${this._colour}`;
    }

    // Return whether space is occupied
    get spaceOccupation() {
        if (this._space.length === 0) {
            this._availability = true;
            return "No pieces are in this space";
        } else {
            this._availability = false;
            return this._space;
        }
    }

    // Return board tile
    boardTile() {
        return `<div id={this._position}></div>`
    }
}

// Board Design
const createBoard = () => {
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

// Initialise Object
export const chessBoard = createBoard();


// Create the chess board element
const chessBoardElement = document.createElement('div');
chessBoardElement.classList.add('chess-board');

// Append tiles to the chess board element
chessBoard.forEach(row => {
    row.forEach(tile => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('chess-tile', tile._colour);
        tileElement.innerHTML = tile.boardTile();
        chessBoardElement.appendChild(tileElement);
    });
});

// Append the chess board element to the body of the document
document.body.appendChild(chessBoardElement);