import Piece from "./Piece";
import Square from "./Square";

type board = Square[][];
type moves = Square[];

export default class Rook extends Piece {
  constructor(color: string, position: {row: number, column: number} | null, type = 'rook') {
    super(color, position, type);
  }

  getMoves(board: board): moves {
    let moves: moves = [];

    moves = moves.concat(this.getNorthMoves(board));
    moves = moves.concat(this.getSouthMoves(board));
    moves = moves.concat(this.getEastMoves(board));
    moves = moves.concat(this.getWestMoves(board));

    return moves;
  }

  getNorthMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      let [currentRow, currentColumn] = [this.position.row, this.position.column];

      while (currentRow - 1 >= 0) {
        if (board[currentRow - 1][currentColumn].isEmpty()) {
          moves.push(board[currentRow - 1][currentColumn]);
        } else if (board[currentRow - 1][currentColumn].piece?.color !== this.color) {
          moves.push(board[currentRow - 1][currentColumn]);
          break;
        } else if (board[currentRow - 1][currentColumn].piece?.color === this.color) {
          break;
        }

        currentRow--;
      }
    }

    return moves;
  }

  getSouthMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      let [currentRow, currentColumn] = [this.position.row, this.position.column];

      while (currentRow + 1 <= 7) {
        if (board[currentRow + 1][currentColumn].isEmpty()) {
          moves.push(board[currentRow + 1][currentColumn]);
        } else if (board[currentRow + 1][currentColumn].piece?.color !== this.color) {
          moves.push(board[currentRow + 1][currentColumn]);
          break;
        } else if (board[currentRow + 1][currentColumn].piece?.color === this.color) {
          break;
        }

        currentRow++;
      }
    }

    return moves;
  }

  getEastMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      let [currentRow, currentColumn] = [this.position.row, this.position.column];

      while (currentColumn + 1 <= 7) {
        if (board[currentRow][currentColumn + 1].isEmpty()) {
          moves.push(board[currentRow][currentColumn + 1]);
        } else if (board[currentRow][currentColumn + 1].piece?.color !== this.color) {
          moves.push(board[currentRow][currentColumn + 1]);
          break;
        } else if (board[currentRow][currentColumn + 1].piece?.color === this.color) {
          break;
        }

        currentColumn++;
      }
    }

    return moves;
  }

  getWestMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      let [currentRow, currentColumn] = [this.position.row, this.position.column];

      while (currentColumn - 1 >= 0) {
        if (board[currentRow][currentColumn - 1].isEmpty()) {
          moves.push(board[currentRow][currentColumn - 1]);
        } else if (board[currentRow][currentColumn - 1].piece?.color !== this.color) {
          moves.push(board[currentRow][currentColumn - 1]);
          break;
        } else if (board[currentRow][currentColumn - 1].piece?.color === this.color) {
          break;
        }

        currentColumn--;
      }
    }

    return moves;
  }
}