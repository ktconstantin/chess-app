import React from 'react';
import { 
  GiChessPawn, 
  GiChessRook, 
  GiChessKnight, 
  GiChessBishop, 
  GiChessQueen, 
  GiChessKing 
} from "react-icons/gi";

interface CapturedPieceProps {
  color: string,
  type: string,
}

export default function CapturedPiece({ color, type }: CapturedPieceProps) {

  let icon = null;
  let iconStyle = '';

  if (color === 'black') {
    iconStyle = 'captured-piece--black-icon';
  } else if (color === 'white') {
    iconStyle = 'captured-piece--white-icon';
  }
  
  switch (type) {
    case 'pawn':
      icon = <GiChessPawn className={iconStyle} />
      break;
    case 'bishop':
      icon = <GiChessBishop className={iconStyle} />
      break;
    case 'knight':
      icon = <GiChessKnight className={iconStyle} />
      break;
    case 'rook':
      icon = <GiChessRook className={iconStyle} />
      break;
    case 'queen':
      icon = <GiChessQueen className={iconStyle} />
      break;
    case 'king':
      icon = <GiChessKing className={iconStyle} />
      break;
  }
  
  return (
    <div className="captured-piece">
      {icon}
    </div>
  )
}
