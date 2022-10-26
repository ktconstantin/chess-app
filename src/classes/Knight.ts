import Piece from "./Piece";

export default class Knight extends Piece {
  constructor(color: string, position: {row: number, column: number} | null, type = 'knight') {
    super(color, position, type);
  }
}