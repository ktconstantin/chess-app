import Piece from "./Piece";

export default class Square {
  name: string;
  className: string;
  piece: Piece | null;

  constructor(name: string, className: string, piece: Piece | null = null) {
    this.name = name;
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