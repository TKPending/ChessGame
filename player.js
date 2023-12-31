// Player Score
export const PLAYERS = {
    "white": {
        "piecesCaptured": [],
        "inCheck": false,
        "inCheckmate": false,
    },
    "black": {
        "piecesCaptured": [],
        "inCheck": false,
        "inCheckmate": false,
    },
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