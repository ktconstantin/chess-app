import Piece from "./Piece";

export default class Square {
  name: string;
  row: number;
  column: number;
  className: string;
  piece: Piece | null;

  constructor(name: string, row: number, column: number, className: string, piece: Piece | null = null) {
    this.name = name;
    this.row = row;
    this.column = column;
    this.className = className;
    this.piece = piece;
  }

  setPiece(piece: Piece) {
    this.piece = piece;
  }

  removePiece() {
    this.piece = null;
  }

  isEmpty() {
    return this.piece === null;
  }
}