// Track game state
export const PLAYERS = {
    // White Player
    "white": {
        "availablePieces": [],
        "piecesCaptured": [],
        "inCheck": false,
        "inCheckmate": false,
    },
    // Black Player
    "black": {
        "availablePieces": [],
        "piecesCaptured": [],
        "inCheck": false,
        "inCheckmate": false,
    },
    // Game State
    "game": {
        "currentTurn": "white",
        "previousMove": null,
        "status": "on-going",
        "moveHistory": [],
        "promotions": [],
        "checkWinning": null,
        "winner": null
    }
}

export const PLAYERGAME = PLAYERS["game"];
export const WHITEPLAYER = PLAYERS["white"];
export const BLACKPLAYER = PLAYERS["black"];