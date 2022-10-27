import Bishop from "./Bishop";
import King from "./King";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Queen from "./Queen";
import Rook from "./Rook";
import Square from "./Square";

type board = Square[][];

export default class Board {
  squares: board;

  constructor() {
    this.squares = this.init();
  }

  static FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  static RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

  init(): board {
    const board: board = [];

    // for (let y = 8; y >= 1; y--) {
    //   const row = [];

    //   for (let x = 1; x <= 8; x++) {
    //     const name = `${Board.FILES[x - 1]}${y}`
    //     const position = {x, y};

    //     let piece = null;
    //     const square = new Square(name, piece);

    //     if (y === 8) {
    //       if (x === 1 || x === 8) square.setPieceTo(new Rook('black', position));
    //       if (x === 2 || x === 7) square.setPieceTo(new Knight('black', position));
    //       if (x === 3 || x === 6) square.setPieceTo(new Bishop('black', position));
    //       if (x === 4) square.setPieceTo(new Queen('black', position));
    //       if (x === 5) square.setPieceTo(new King('black', position));
    //     } else if (y === 7) {
    //       square.setPieceTo(new Pawn('black', position));
    //     } else if (y === 2) {
    //       square.setPieceTo(new Pawn('white', position));
    //     } else if (y === 1) {
    //       if (x === 1 || x === 8) square.setPieceTo(new Rook('white', position));
    //       if (x === 2 || x === 7) square.setPieceTo(new Knight('white', position));
    //       if (x === 3 || x === 6) square.setPieceTo(new Bishop('white', position));
    //       if (x === 4) square.setPieceTo(new Queen('white', position));
    //       if (x === 5) square.setPieceTo(new King('white', position));
    //     }

    //     row.push(square);
    //   }

    //   board.push(row);
    // }

    for (let row = 0; row < 8; row++) {
      const rank = Board.RANKS[row];
      const boardRow: Square[] = [];

      for (let column = 0; column < 8; column++) {
        const file = Board.FILES[column];

        let className = '';

        if (row % 2 === 0) {
          className = column % 2 === 0 ? 'square-light' : 'square-dark';
        } else {
          className = column % 2 === 0 ? 'square-dark' : 'square-light';
        }

        const square = new Square(`${file}${rank}`, row, column, className);
        const position = {row, column};

        if (row === 0) { // rank 8
          if (column === 0 || column === 7) square.setPiece(new Rook('black', position));
          if (column === 1 || column === 6) square.setPiece(new Knight('black', position));
          if (column === 2 || column === 5) square.setPiece(new Bishop('black', position));
          if (column === 3) square.setPiece(new Queen('black', position));
          if (column === 4) square.setPiece(new King('black', position));
        } else if (row === 1) {
          square.setPiece(new Pawn('black', position));
        } else if (row === 6) {
          square.setPiece(new Pawn('white', position));
        } else if (row === 7) {
          if (column === 0 || column === 7) square.setPiece(new Rook('white', position));
          if (column === 1 || column === 6) square.setPiece(new Knight('white', position));
          if (column === 2 || column === 5) square.setPiece(new Bishop('white', position));
          if (column === 3) square.setPiece(new Queen('white', position));
          if (column === 4) square.setPiece(new King('white', position));
        }

        boardRow.push(square);
      }

      board.push(boardRow);
    }

    return board;
  }

  resetAllSquares() {
    this.squares.forEach(row => {
      row.forEach(square => {
        square.resetDisplay();
      });
    });
  }
}