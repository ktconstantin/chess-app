import React from 'react';
import Piece from '../classes/Piece';
import { 
  GiChessPawn, 
  GiChessRook, 
  GiChessKnight, 
  GiChessBishop, 
  GiChessQueen, 
  GiChessKing 
} from "react-icons/gi";

interface SquareComponentProps {
  row: number,
  column: number,
  className: string;
  piece: Piece | null;
  name: string;
  handleSquareClick: Function;
}

export default function SquareComponent({ 
  row,
  column,
  className, 
  piece, 
  name, 
  handleSquareClick,
}: SquareComponentProps) {

  let pieceIcon = null;
  let iconStyle = '';

  if (piece?.color === 'black') {
    iconStyle = 'piece--black';
  } else if (piece?.color === 'white') {
    iconStyle = 'piece--white';
  }

  if (piece) {
    switch (piece.type) {
      case 'pawn':
        pieceIcon = <GiChessPawn className={iconStyle} />
        break;
      case 'bishop':
        pieceIcon = <GiChessBishop className={iconStyle} />
        break;
      case 'knight':
        pieceIcon = <GiChessKnight className={iconStyle} />
        break;
      case 'rook':
        pieceIcon = <GiChessRook className={iconStyle} />
        break;
      case 'queen':
        pieceIcon = <GiChessQueen className={iconStyle} />
        break;
      case 'king':
        pieceIcon = <GiChessKing className={iconStyle} />
        break;
    }
  }

  return (
    <div 
      className={className}
      onClick={() => handleSquareClick(row, column)}
    >
      <div>{name}</div>
      <div className="piece-icon">
        {piece !== null && pieceIcon}
      </div>
    </div>
  )
}
