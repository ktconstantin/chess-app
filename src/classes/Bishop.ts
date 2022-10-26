import Piece from "./Piece";
import Square from "./Square";

type board = Square[][];
type moves = Square[];

export default class Bishop extends Piece {
  constructor(color: string, position: {row: number, column: number} | null, type = 'bishop') {
    super(color, position, type);
  }

  getMoves(board: board): moves {
    let moves: moves = [];

    moves = moves.concat(this.getNorthEastMoves(board));
    moves = moves.concat(this.getNorthWestMoves(board));
    moves = moves.concat(this.getSouthEastMoves(board));
    moves = moves.concat(this.getSouthWestMoves(board));

    return moves;
  }

  getNorthEastMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      let [currentRow, currentColumn] = [this.position.row, this.position.column];

      while (currentRow - 1 >= 0 && currentColumn + 1 <= 7) {
        if (board[currentRow - 1][currentColumn + 1].isEmpty()) {
          moves.push(board[currentRow - 1][currentColumn + 1]);
        } else if (board[currentRow - 1][currentColumn + 1].piece?.color !== this.color) {
          moves.push(board[currentRow - 1][currentColumn + 1]);
          break;
        } else if (board[currentRow - 1][currentColumn + 1].piece?.color === this.color) {
          break;
        }

        currentRow--;
        currentColumn++;
      }
    }

    return moves;
  }

  getSouthEastMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      let [currentRow, currentColumn] = [this.position.row, this.position.column];

      while (currentRow + 1 <= 7 && currentColumn + 1 <= 7) {
        if (board[currentRow + 1][currentColumn + 1].isEmpty()) {
          moves.push(board[currentRow + 1][currentColumn + 1]);
        } else if (board[currentRow + 1][currentColumn + 1].piece?.color !== this.color) {
          moves.push(board[currentRow + 1][currentColumn + 1]);
          break;
        } else if (board[currentRow + 1][currentColumn + 1].piece?.color === this.color) {
          break;
        }

        currentRow++;
        currentColumn++;
      }
    }

    return moves;
  }

  getSouthWestMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      let [currentRow, currentColumn] = [this.position.row, this.position.column];

      while (currentRow + 1 <= 7 && currentColumn - 1 >= 0) {
        if (board[currentRow + 1][currentColumn - 1].isEmpty()) {
          moves.push(board[currentRow + 1][currentColumn - 1]);
        } else if (board[currentRow + 1][currentColumn - 1].piece?.color !== this.color) {
          moves.push(board[currentRow + 1][currentColumn - 1]);
          break;
        } else if (board[currentRow + 1][currentColumn - 1].piece?.color === this.color) {
          break;
        }

        currentRow++;
        currentColumn--;
      }
    }

    return moves;
  }

  getNorthWestMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      let [currentRow, currentColumn] = [this.position.row, this.position.column];

      while (currentRow - 1 >= 0 && currentColumn - 1 >= 0) {
        if (board[currentRow - 1][currentColumn - 1].isEmpty()) {
          moves.push(board[currentRow - 1][currentColumn - 1]);
        } else if (board[currentRow - 1][currentColumn - 1].piece?.color !== this.color) {
          moves.push(board[currentRow - 1][currentColumn - 1]);
          break;
        } else if (board[currentRow - 1][currentColumn - 1].piece?.color === this.color) {
          break;
        }

        currentRow--;
        currentColumn--;
      }
    }

    return moves;
  }
}