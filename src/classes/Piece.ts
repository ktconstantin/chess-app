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

  setAsCaptured() {
    this.isCaptured = true;
    this.setPosition(null);
  }

  setToUncaptured() {
    this.isCaptured = false;
  }

  setPosition(newPosition: {row: number, column: number} | null) {
    this.position = newPosition;
  }
}