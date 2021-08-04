import State from "./state.js";
import Play from "./play.js";

const N_ROWS = 6;
const N_COLS = 8;

const checkPrototype = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];


class Game {
  constructor(actualScenery, player) {
    this.actualScenery = actualScenery;
    this.player = player === 0 ? -1 : 1;
  }

  start() {
    return new State([], this.actualScenery, this.player);
  }

  legalPlays(state) {
    let legalPlays = [];
    for (let col = 0; col < N_COLS; col++) {
      for (let row = N_ROWS - 1; row >= 0; row--) {
        if (state.board[col][row] == 0) {
          legalPlays.push(new Play(col, row));
          break;
        }
      }
    }
    return legalPlays;
  }
  nextState(state, play) {
    let newHistory = state.playHistory.slice();
    newHistory.push(play);
    let newBoard = state.board.map((row) => row.slice());
    newBoard[play.row][play.col] = state.player;
    let newPlayer = -state.player;

    return new State(newHistory, newBoard, newPlayer);
  }
  winner(state) {
    if (
      !isNaN(state.board[0].reduce((acc, cur) => (cur == 0 ? NaN : acc + cur)))
    )
      return 0;

    let checkBoards = new Map();
    checkBoards.set(
      "horiz",
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      "verti",
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      "ldiag",
      checkPrototype.map((row) => row.slice())
    );
    checkBoards.set(
      "rdiag",
      checkPrototype.map((row) => row.slice())
    );

    for (let row = 0; row < N_ROWS; row++) {
      for (let col = 0; col < N_COLS; col++) {
        let cell = state.board[row][col];
        for (let [key, val] of checkBoards) {
          // accumulator
          let acc;
          switch (key) {
            case "horiz":
              acc = val[row + 1][col]; // left
              break;
            case "verti":
              acc = val[row][col + 1]; // top
              break;
            case "ldiag":
              acc = val[row][col]; // top left
              break;
            case "rdiag":
              acc = val[row][col + 2]; // top right
              break;
          }

          val[row + 1][col + 1] = cell;
          if ((cell < 0 && acc < 0) || (cell > 0 && acc > 0)) {
            val[row + 1][col + 1] += acc;
          }
          if (val[row + 1][col + 1] == 4) return 1;
          if (val[row + 1][col + 1] == -4) return -1;
        }
      }
    }
    return null;
  }
}

export default Game;
