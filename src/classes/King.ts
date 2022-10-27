import Piece from "./Piece";
import Square from "./Square";

type board = Square[][];
type moves = Square[];

export default class King extends Piece {
  constructor(color: string, position: {row: number, column: number} | null, type = 'king') {
    super(color, position, type);
  }

  static moveCoordinates = [
    {row: 0, column: 1},
    {row: 1, column: 1},
    {row: 1, column: 0},
    {row: 1, column: -1},
    {row: 0, column: -1},
    {row: -1, column: -1},
    {row: -1, column: 0},
    {row: -1, column: 1},
  ];

  getMoves(board: board): moves {
    const moves: moves = [];

    if (this.position === null) {
      return moves; // piece is captured
    } else {
      const [row, column] = [this.position.row, this.position.column];

      King.moveCoordinates.forEach(coordinates => {
        const [newRow, newColumn] = [row + coordinates.row, column + coordinates.column];

        if (
          newRow < 0 ||
          newRow > 7 ||
          newColumn < 0 ||
          newColumn > 7
        ) {
          return;
        } else {
          const move = board[newRow][newColumn];

          if (move.isEmpty()) {
            moves.push(move);
          } else if (move && move.piece) {
            if (move.piece.color !== this.color) {
              moves.push(move);
            }
          }
        }
      });
    }

    return moves;
  }
}