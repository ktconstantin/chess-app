import Bishop from "./Bishop";
import Piece from "./Piece";
import Rook from "./Rook";
import Square from "./Square";

type board = Square[][];
type moves = Square[];

export default class Queen extends Piece {
  constructor(color: string, position: {row: number, column: number}, type = 'queen') {
    super(color, position, type);
  }
  
  getMoves(board: board): moves {
    let moves: moves = [];

    const rook = new Rook(this.color, this.position);
    const bishop = new Bishop(this.color, this.position);

    moves = moves.concat(rook.getMoves(board));
    moves = moves.concat(bishop.getMoves(board));

    return moves;
  }
}