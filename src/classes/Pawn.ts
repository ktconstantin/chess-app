import Piece from "./Piece";
import Square from "./Square";

type board = Square[][];
type moves = Square[];

export default class Pawn extends Piece {
  constructor(color: string, position: {row: number, column: number} | null, type = 'pawn') {
    super(color, position, type);
  }

  getMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      const [row, column] = [this.position.row, this.position.column];

      if (this.hasMoved === false) {
        if (this.color === 'black') {
          if (board[row + 2][column].isEmpty()) {
            moves.push(board[row + 2][column]);
          }
          if (board[row + 1][column].isEmpty()) {
            moves.push(board[row + 1][column]);
          }
        }
        if (this.color === 'white') {
          if (board[row - 2][column].isEmpty()) {
            moves.push(board[row - 2][column]);
          }
          if (board[row - 1][column].isEmpty()) {
            moves.push(board[row - 1][column]);
          }
        }
      } else { // piece has moved
        
        if (this.color === 'black') {

          if (row !== 7) { // one row forwards is not off the board
            // move forwards one if empty
            if (board[row + 1][column].isEmpty()) {
              moves.push(board[row + 1][column]);
            }

            // capture diagonally
            if (column - 1 >= 0) {
              if (board[row + 1][column - 1].piece?.color !== this.color) {
                moves.push(board[row + 1][column - 1]);
              }
            }

            // capture diagonally
            if (column + 1 <= 7) {
              if (board[row + 1][column + 1].piece?.color !== this.color) {
                moves.push(board[row + 1][column + 1]);
              }
            }

            if (row + 1 === 7) {
              console.log('promote pawn');
            }
          }
        }

        if (this.color === 'white') {

          if (row !== 0) { // one row forwards is not off the board
            // move forwards one if empty
            if (board[row - 1][column].isEmpty()) {
              moves.push(board[row - 1][column]);

              if (row - 1 === 0) {
                console.log('promote pawn');
              }
            }

            // capture diagonally
            if (column - 1 >= 0) {
              if (board[row - 1][column - 1].piece?.color !== this.color) {
                moves.push(board[row - 1][column - 1]);
              }
            }
            if (column + 1 <= 7) {
              if (board[row - 1][column + 1].piece?.color !== this.color) {
                moves.push(board[row - 1][column + 1]);
              }
            }

            if (row - 1 === 0) {
              console.log('promote pawn');
            }
          }
        }
      }
    }

    return moves;
  }
}