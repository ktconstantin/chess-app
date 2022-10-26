import Square from "./Square";

type board = Square[][];
type moves = Square[] | [];

export default class Piece {
  color: string;
  position: {row: number, column: number} | null;
  type: string;
  hasMoved: boolean;
  isCaptured: boolean;

  constructor(color: string, position: {row: number, column: number} | null, type: string) {
    this.color = color;
    this.position = position;
    this.type = type;
    this.hasMoved = false;
    this.isCaptured = false;
  }

  getMoves(board: board) {
    const moves: moves = [];
    return moves;
  }

  setHasMoved() {
    this.hasMoved = true;
  }

  setToCaptured() {
    this.isCaptured = true;
  }

  setToUncaptured() {
    this.isCaptured = false;
  }
}