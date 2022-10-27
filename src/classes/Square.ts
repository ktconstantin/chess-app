import { endianness } from "os";
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

  setClassNameTo(style: string) {
    this.className = style;
  }

  displayAsLegalMove() {
    //this.setClassNameTo(`${this.className} legal-move`);
    if (this.className === 'square-dark') {
      this.setClassNameTo('square-dark legal-move');
    } 
    
    if (this.className === 'square-light') {
      this.setClassNameTo('square-light legal-move');
    }
  }

  resetDisplay() {
    if (this.className === 'square-dark legal-move') {
      this.setClassNameTo('square-dark');
    }
    
    if (this.className === 'square-light legal-move') {
      this.setClassNameTo('square-light');
    }
  }
}